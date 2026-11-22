<?php

return [
    'enabled' => env('MAINTENANCE_MANAGER_ENABLED', true),
    'route' => [
        'prefix' => env('MAINTENANCE_MANAGER_ROUTE_PREFIX', 'maintenance-manager'),
        'middleware' => ['web', 'auth'],
    ],
    'storage' => storage_path('app/maintenance-manager.json'),
    'bypass_secret' => env('MAINTENANCE_MANAGER_BYPASS_SECRET'),
    'bypass_cookie' => 'maintenance_manager_bypass',
    'bypass_cookie_minutes' => 60,
    'allowed_ips' => [],
    'except' => ['maintenance-manager*', 'up', 'build/*', 'storage/*'],
    'timezone' => env('APP_TIMEZONE', 'Europe/Istanbul'),
    'locale' => env('APP_LOCALE', 'en'),
];
