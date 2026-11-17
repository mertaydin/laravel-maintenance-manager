<?php

namespace MertAydin\MaintenanceManager\Tests;

use Illuminate\Support\Carbon;
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