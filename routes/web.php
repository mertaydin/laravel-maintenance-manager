<?php

use Illuminate\Support\Facades\Route;
use MertAydin\MaintenanceManager\Http\Controllers\DashboardController;

Route::group([
    'prefix' => config('maintenance-manager.route.prefix', 'maintenance-manager'),
    'middleware' => config('maintenance-manager.route.middleware', ['web', 'auth']),
    'as' => 'maintenance-manager.',
], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::put('/', [DashboardController::class, 'update'])->name('update');
});