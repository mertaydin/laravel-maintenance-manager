# Laravel Maintenance Manager

[![Latest Version](https://img.shields.io/packagist/v/mertaydin/laravel-maintenance-manager?label=Packagist)](https://packagist.org/packages/laravel-maintenance-manager)
[![Total Downloads](https://img.shields.io/packagist/dt/mertaydin/laravel-maintenance-manager?label=downloads)](https://packagist.org/packages/laravel-maintenance-manager)
[![PHP](https://img.shields.io/packagist/php-v/mertaydin/laravel-maintenance-manager?label=PHP)](https://packagist.org/packages/laravel-maintenance-manager)
[![Laravel](https://img.shields.io/badge/Laravel-10%20%7C%2011%20%7C%2012%20%7C%2013-FF2D20?logo=laravel&logoColor=white)](https://laravel.com)
[![CI](https://github.com/mertaydin/laravel-maintenance-manager/actions/workflows/tests.yml/badge.svg?branch=main&label=CI)](https://github.com/mertaydin/laravel-maintenance-manager/actions/workflows/tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)


A responsive maintenance-mode control panel for Laravel.

## Dashboard authorization

The management dashboard requires an authenticated user **and** an explicit Laravel authorization Gate by default. Both viewing and changing maintenance settings are denied unless the configured Gate allows the user. This prevents any ordinary authenticated account from enabling maintenance mode, changing the IP allowlist, or modifying the visitor page.

Define the default Gate in your application (for example, in `App\Providers\AppServiceProvider::boot()`):

```php
use Illuminate\Support\Facades\Gate;

Gate::define('manageMaintenanceManager', fn ($user) => (bool) $user->is_admin);
```

Replace `is_admin` with your application's role or permission check. The Gate name is configurable with `MAINTENANCE_MANAGER_MANAGE_GATE` or `authorization.manage_gate` in `config/maintenance-manager.php`. You can also add role middleware to `route.middleware` for defense in depth.

## Dashboard preview

The screenshot is automatically recaptured from the real package dashboard in a temporary Laravel application by GitHub Actions (Playwright).

<p align="center">
  <img src="docs/images/dashboard-screenshot.png" alt="Laravel Maintenance Manager dashboard preview" width="100%">
</p>
 Enable or schedule downtime, customize the visitor page with an optional image, manage IP allowlists, review recent mode changes, and grant temporary bypass access with a private secret.

## Requirements

- PHP 8.2+
- Laravel 10, 11, 12 or 13

## Installation

```bash
composer require mertaydin/laravel-maintenance-manager
php artisan vendor:publish --tag=maintenance-manager-config
php artisan vendor:publish --tag=maintenance-manager-assets --force
```

After every package update, rerun the asset publishing command with `--force` so the latest dashboard JavaScript and CSS replace previously published copies.

The dashboard is available at `/maintenance-manager`. Its routes use Laravel's `web` and `auth` middleware and both dashboard actions also require the configured `manageMaintenanceManager` Gate. Define that Gate for an administrator or a dedicated permission before granting access. The package fails closed if the Gate is missing or denies the user.

## Enable request interception

The package deliberately does not register its maintenance middleware globally. Add it to your application's web middleware group so normal application requests are intercepted.

### Laravel 11, 12 and 13

In `bootstrap/app.php`:

```php
use Illuminate\Foundation\Configuration\Middleware;
use MertAydin\MaintenanceManager\Http\Middleware\MaintenanceMiddleware;

->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        MaintenanceMiddleware::class,
    ]);
})
```

### Laravel 10

Append `MertAydin\MaintenanceManager\Http\Middleware\MaintenanceMiddleware::class` to the `web` middleware group in `app/Http/Kernel.php`.

The default excluded paths include the dashboard route, Laravel's health endpoint, and common asset paths. Customize `except` in the package config as needed.

## Configuration

Publish the config file and review:

- `enabled`: master switch for the package middleware.
- `route.prefix`: dashboard URL prefix.
- `route.middleware`: middleware protecting the dashboard.
- `authorization.manage_gate`: Laravel Gate required to view and update maintenance settings (`manageMaintenanceManager` by default).
- `allowed_ips`: IP addresses that can access the application during maintenance.
- `except`: URL path patterns excluded from maintenance.
- `storage`: JSON state file path.
- `timezone`: timezone used for scheduled start/end values.
- `bypass_secret`: optional temporary-access secret.

The dashboard includes six languages (Turkish, English, Spanish, Simplified Chinese, Hindi, and Arabic), light/dark/system themes, and optional JPG, PNG, or WebP maintenance artwork (maximum 2 MB). The selected language is also applied to the public maintenance page. Uploaded artwork is stored under `public/vendor/maintenance-manager/uploads`.

The manager stores its state in `storage/app/maintenance-manager.json` by default. Ensure the PHP process can write to that directory.

## Temporary bypass access

Set a long random value in `.env`:

```dotenv
MAINTENANCE_MANAGER_BYPASS_SECRET="replace-with-a-long-random-secret"
```

Open the application over HTTPS with `?maintenance_bypass=YOUR_SECRET`. The package rejects this credential over plain HTTP, validates it, redirects to the clean URL, and issues a Secure, HTTP-only bypass cookie. The redirect also sets `Referrer-Policy: no-referrer` and `Cache-Control: no-store`. The cookie lifetime is configurable with `bypass_cookie_minutes`. Ensure HTTPS is correctly detected by Laravel (including trusted proxy configuration), keep the secret private, and rotate it after the maintenance window.

## Assets and Content Security Policy

The dashboard styles and scripts are served as separate published files under `public/vendor/maintenance-manager`. The package does not require inline JavaScript or inline style attributes.

## License

MIT

## Documentation and support

- [Changelog](CHANGELOG.md)
- [GitHub releases](https://github.com/mertaydin/laravel-maintenance-manager/releases)
- [Report an issue or request a feature](https://github.com/mertaydin/laravel-maintenance-manager/issues)

---

**Dil / Language:** [Türkçe README](README.tr.md) · [English README](README.md)
