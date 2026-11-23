<?php

namespace MertAydin\MaintenanceManager\Tests;

use Illuminate\Auth\GenericUser;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use MertAydin\MaintenanceManager\Http\Middleware\MaintenanceMiddleware;
use MertAydin\MaintenanceManager\MaintenanceManagerServiceProvider;
use MertAydin\MaintenanceManager\Support\MaintenanceManager;
use Orchestra\Testbench\TestCase;

class ExampleTest extends TestCase
{
    protected function getPackageProviders($app): array
    {
        return [MaintenanceManagerServiceProvider::class];
    }

    protected function setUp(): void
    {
        parent::setUp();

        config()->set('app.key', 'base64:'.base64_encode(str_repeat('a', 32)));
        config()->set('maintenance-manager.storage', sys_get_temp_dir().'/maintenance-manager-'.uniqid().'.json');
        config()->set('maintenance-manager.timezone', 'Europe/Istanbul');
    }

    protected function tearDown(): void
    {
        $path = config('maintenance-manager.storage');
        if (is_file($path)) {
            unlink($path);
        }

        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_dashboard_routes_require_authentication(): void
    {
        Route::get('/login', fn () => 'login')->name('login');

        $this->assertContains('auth', Route::getRoutes()->getByName('maintenance-manager.index')->gatherMiddleware());

        $this->get(route('maintenance-manager.index'))
            ->assertRedirect(route('login'));

        $this->put(route('maintenance-manager.update'), [])
            ->assertRedirect(route('login'));
    }

    public function test_authenticated_users_without_the_management_gate_are_forbidden(): void
    {
        $this->actingAs(new GenericUser(['id' => 1]));

        $this->get(route('maintenance-manager.index'))->assertForbidden();
        $this->put(route('maintenance-manager.update'), [])->assertForbidden();
    }

    public function test_management_gate_allows_authorized_users_to_view_and_update_settings(): void
    {
        Gate::define('manageMaintenanceManager', fn ($user): bool => $user->getAuthIdentifier() === 1);
        $this->actingAs(new GenericUser(['id' => 1]));

        $this->get(route('maintenance-manager.index'))->assertOk();

        $this->put(route('maintenance-manager.update'), [
            'enabled' => true,
            'title' => 'Planned maintenance',
            'message' => 'We will be back shortly.',
        ])->assertRedirect();

        $this->assertTrue(app(MaintenanceManager::class)->state()['enabled']);
    }

    public function test_bypass_secret_is_rejected_over_plain_http(): void
    {
        config()->set('maintenance-manager.bypass_secret', 'test-secret');
        app(MaintenanceManager::class)->save(['enabled' => true]);

        $request = Request::create('http://localhost/?maintenance_bypass=test-secret');
        $response = app(MaintenanceMiddleware::class)->handle($request, fn () => response('next'));

        $this->assertSame(503, $response->getStatusCode());
        $this->assertNull($response->headers->get('Set-Cookie'));
    }

    public function test_bypass_secret_over_https_issues_a_protected_cookie_and_clean_redirect(): void
    {
        config()->set('maintenance-manager.bypass_secret', 'test-secret');
        app(MaintenanceManager::class)->save(['enabled' => true]);

        $request = Request::create('https://localhost/?maintenance_bypass=test-secret');
        $response = app(MaintenanceMiddleware::class)->handle($request, fn () => response('next'));

        $this->assertSame(302, $response->getStatusCode());
        $this->assertSame('https://localhost', $response->headers->get('Location'));
        $this->assertSame('no-referrer', $response->headers->get('Referrer-Policy'));
        $this->assertStringContainsString('httponly', strtolower((string) $response->headers->get('Set-Cookie')));
        $this->assertStringContainsString('secure', strtolower((string) $response->headers->get('Set-Cookie')));
        $this->assertStringContainsString('no-store', (string) $response->headers->get('Cache-Control'));
    }

    public function test_package_metadata_is_present(): void
    {
        $composer = json_decode(file_get_contents(__DIR__.'/../composer.json'), true);

        $this->assertSame('mertaydin/laravel-maintenance-manager', $composer['name']);
        $this->assertSame('MIT', $composer['license']);
    }

    public function test_state_is_persisted_and_defaults_are_available(): void
    {
        $manager = app(MaintenanceManager::class);

        $this->assertFalse($manager->state()['enabled']);
        $manager->save(['enabled' => true, 'title' => 'Planned maintenance']);

        $this->assertTrue($manager->state()['enabled']);
        $this->assertSame('Planned maintenance', $manager->state()['title']);
        $this->assertIsArray($manager->state()['history']);
    }

    public function test_maintenance_schedule_respects_start_and_end_times(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-11-17 12:00:00', 'Europe/Istanbul'));
        $manager = app(MaintenanceManager::class);
        $manager->save([
            'enabled' => true,
            'starts_at' => '2026-11-17 13:00:00',
            'ends_at' => '2026-11-17 15:00:00',
        ]);

        $this->assertFalse($manager->isActive());

        Carbon::setTestNow(Carbon::parse('2026-11-17 14:00:00', 'Europe/Istanbul'));
        $this->assertTrue($manager->isActive());

        Carbon::setTestNow(Carbon::parse('2026-11-17 15:00:00', 'Europe/Istanbul'));
        $this->assertFalse($manager->isActive());
    }
}
