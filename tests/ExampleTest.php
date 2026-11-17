<?php

namespace MertAydin\\MaintenanceManager\\Tests;

use PHPUnit\\Framework\\TestCase;

class ExampleTest extends TestCase
{
    public function test_package_metadata_is_present(): void
    {
        $composer = json_decode(file_get_contents(__DIR__.'/../composer.json'), true);
        $this->assertSame('mertaydin/laravel-maintenance-manager', $composer['name']);
        $this->assertSame('MIT', $composer['license']);
    }
}