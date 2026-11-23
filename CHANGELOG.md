## v0.2.4 - 2026-11-23

- Require an explicit Laravel authorization Gate to view or modify maintenance settings; authenticated users without the configured permission are denied by default.
- Add authorization regression tests and document Gate configuration.

## v0.2.3 - 2026-11-22

- Add `barryvdh/laravel-ide-helper` as a development dependency, selecting a compatible release for the supported Laravel versions.
- Run Laravel Pint across the PHP codebase and add an automated formatting workflow.

## v0.2.2 - 2026-11-19

- Publish the consolidated security CI baseline with Composer audit, PHPStan/Larastan, Pint, PHP syntax validation, automated tests, and Dependabot updates.

## v0.1.18 - 2026-11-19

- Add the shared security CI baseline: Composer audit, PHPStan/Larastan, changed-file Pint checks, PHP syntax validation, and automated tests.
- Add weekly Dependabot updates and resilient Composer dependency resolution.

## v0.1.17 - 2026-11-19

- Add security CI with Composer vulnerability auditing, PHPStan/Larastan analysis, Pint checks, PHP syntax validation, and automated tests.
- Add weekly Dependabot updates for Composer dependencies and GitHub Actions.

# Changelog

## v0.1.13 - 2026-11-19

- Add automated browser capture of the live maintenance dashboard and update the README screenshot.


## v0.1.12 - 2026-11-19

- Document force-refreshing published dashboard assets after package updates.

## v0.1.11 - 2026-11-19

- Add direct README links to the changelog, releases, and issue support.
## v0.1.10 - 2026-11-19

- Correct the route middleware declaration while keeping authentication mandatory for the dashboard and update endpoint.


## v0.1.9 - 2026-11-19

- Enforce the `web` and `auth` middleware on management routes even when additional route middleware is customized; add regression tests for guest access.



## v0.1.8 - 2026-11-19

- Protect the maintenance manager dashboard and update endpoint with the default authenticated route middleware; add regression coverage and authorization documentation.
## v0.1.7 - 2026-11-18

- Refresh the README dashboard preview with the current maintenance controls, schedule, IP allowlist, and visitor-page settings.
- Publish the refreshed documentation preview.


All notable changes to this project are documented here.

## Unreleased


## v0.1.6 - 2026-11-18

- Publish a patch release; no functional code changes.

## v0.1.5 - 2026-11-18

- Allow administrators to remove an uploaded maintenance-page image and fall back to the built-in default illustration.

## v0.1.4 - 2026-11-17

- Expand the dashboard language selector and translations to Turkish, English, Spanish, Simplified Chinese, Hindi, and Arabic.
- Apply the selected language to the public maintenance page and add right-to-left layout direction for Arabic.

## v0.1.3

- Replace the abbreviated license file with the complete standard MIT license text so GitHub can identify it.

## v0.1.2

- Add Packagist version, download, license, and GitHub Actions test badges to the README.

## v0.1.1

- Add Laravel 13 compatibility (PHP 8.3+).
- Update Orchestra Testbench and PHPUnit development constraints for Laravel 13 testing.

## v0.1.0

- Add a Laravel maintenance mode management dashboard.
- Support scheduled maintenance windows, IP allowlists, and secret bypass access.
- Add configurable maintenance page content and image uploads.
- Add maintenance history and bilingual Turkish/English interface.
- Support light, dark, and system themes.
- Add Laravel 10, 11, and 12 compatibility with automated tests.
- Add package documentation, badges, and dashboard preview.
