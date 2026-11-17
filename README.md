# Laravel Maintenance Manager

A clean, responsive maintenance-mode dashboard for Laravel applications. Manage your maintenance page, schedule downtime, and allow trusted IP addresses to bypass the maintenance screen.

## Requirements

- PHP 8.2+
- Laravel 10, 11 or 12

## Installation

```bash
composer require mertaydin/laravel-maintenance-manager
php artisan vendor:publish --tag=maintenance-manager-config
php artisan vendor:publish --tag=maintenance-manager-assets
```

Open `/maintenance-manager` (the default route middleware is `web` and `auth`). Change `route.middleware` in `config/maintenance-manager.php` if your application uses a different authentication middleware.

## Enable the maintenance middleware

Register `MertAydin\\MaintenanceManager\\Http\\Middleware\\MaintenanceMiddleware::class` in your application's global web middleware stack so that it can intercept visitor requests. Keep the manager route excluded (the default `maintenance-manager*` exception does this).

For Laravel 11/12, add it to the `web` middleware group in `bootstrap/app.php`:

```php
use MertAydin\\MaintenanceManager\\Http\\Middleware\\MaintenanceMiddleware;
use Illuminate\\Foundation\\Configuration\\Middleware;

->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [MaintenanceMiddleware::class]);
})
```

For Laravel 10, append the middleware to the `web` group in `app/Http/Kernel.php`.

## Configuration

Publish and edit `config/maintenance-manager.php` to customize the dashboard URL, route middleware, allowed IPs, excluded paths, storage file, and bypass secret.

The dashboard persists its state in `storage/app/maintenance-manager.json`. Ensure the web server can write to the `storage/app` directory.

## Bypass secret

Set `MAINTENANCE_MANAGER_BYPASS_SECRET` in `.env`. A visitor with the matching `?maintenance_bypass=...` query parameter can access the application. Keep this value private and rotate it after use.

## License

MIT
