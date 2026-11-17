<?php

namespace MertAydin\MaintenanceManager;

use Illuminate\Support\ServiceProvider;
use MertAydin\MaintenanceManager\Support\MaintenanceManager;

class MaintenanceManagerServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/maintenance-manager.php', 'maintenance-manager');
        $this->app->singleton(MaintenanceManager::class);
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'maintenance-manager');
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');

        if ($this->app->runningInConsole()) {
            $this->publishes([__DIR__.'/../config/maintenance-manager.php' => config_path('maintenance-manager.php')], 'maintenance-manager-config');
            $this->publishes([__DIR__.'/../resources' => public_path('vendor/maintenance-manager')], 'maintenance-manager-assets');
        }
    }
}