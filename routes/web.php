<?php

use Illuminate\Support\Facades\Route;
use MertAydin\MaintenanceManager\Http\Controllers\DashboardController;

Route::group([
    'prefix' => config('maintenance-manager.route.prefix', 'maintenance-manager'),
    'middleware' => array_values(array_unique(array_merge(\n        ['web', 'auth'],\n        (array) config('maintenance-manager.route.middleware', [])\n    ))),
    'as' => 'maintenance-manager.',
], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::put('/', [DashboardController::class, 'update'])->name('update');
});