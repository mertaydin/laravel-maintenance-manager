<?php

namespace MertAydin\\MaintenanceManager\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Str;
use MertAydin\\MaintenanceManager\\Support\\MaintenanceManager;
use Symfony\\Component\\HttpFoundation\\Response;

class MaintenanceMiddleware
{
    public function __construct(private MaintenanceManager $manager) {}

    public function handle(Request $request, Closure $next): Response
    {
        if (! config('maintenance-manager.enabled', true) || ! $this->manager->isActive()) {
            return $next($request);
        }

        $path = ltrim($request->path(), '/');
        foreach ((array) config('maintenance-manager.except', []) as $pattern) {
            if (Str::is($pattern, $path)) {
                return $next($request);
            }
        }

        $state = $this->manager->state();
        $ips = array_unique(array_merge((array) config('maintenance-manager.allowed_ips', []), (array) $state['allowed_ips']));
        if (in_array($request->ip(), $ips, true)) {
            return $next($request);
        }

        $cookieName = (string) config('maintenance-manager.bypass_cookie', 'maintenance_manager_bypass');
        $secret = config('maintenance-manager.bypass_secret');
        $cookieToken = (string) $request->cookie($cookieName, '');
        if ($secret && $cookieToken !== '' && hash_equals(hash('sha256', (string) $secret), $cookieToken)) {
            return $next($request);
        }

        $queryToken = (string) $request->query('maintenance_bypass', '');
        if ($secret && $queryToken !== '' && hash_equals((string) $secret, $queryToken)) {
            return redirect()->to($request->url())->withCookie(cookie(
                $cookieName,
                hash('sha256', (string) $secret),
                (int) config('maintenance-manager.bypass_cookie_minutes', 60),
                '/',
                null,
                $request->isSecure(),
                true,
                false,
                'lax'
            ));
        }

        return response()->view('maintenance-manager::maintenance', ['state' => $state], 503)
            ->header('Retry-After', '3600')
            ->header('Cache-Control', 'no-store, no-cache, must-revalidate');
    }
}