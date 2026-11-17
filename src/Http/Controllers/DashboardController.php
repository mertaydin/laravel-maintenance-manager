<?php

namespace MertAydin\\MaintenanceManager\\Http\\Controllers;

use Illuminate\\Http\\RedirectResponse;
use Illuminate\\Http\\Request;
use Illuminate\\Routing\\Controller;
use Illuminate\\View\\View;
use MertAydin\\MaintenanceManager\\Support\\MaintenanceManager;

class DashboardController extends Controller
{
    public function __construct(private MaintenanceManager $manager) {}

    public function index(): View
    {
        return view('maintenance-manager::dashboard', [
            'state' => $this->manager->state(),
            'active' => $this->manager->isActive(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'enabled' => ['nullable', 'boolean'],
            'title' => ['required', 'string', 'max:120'],
            'message' => ['required', 'string', 'max:2000'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after:starts_at'],
            'allowed_ips' => ['nullable', 'string', 'max:5000'],
        ]);

        $ips = preg_split('/[\\r\\n,]+/', (string) ($validated['allowed_ips'] ?? ''), -1, PREG_SPLIT_NO_EMPTY);
        $ips = array_values(array_filter(array_map('trim', $ips), fn ($ip) => filter_var($ip, FILTER_VALIDATE_IP)));

        $previous = $this->manager->state();
        $enabled = (bool) ($validated['enabled'] ?? false);
        $history = $previous['history'] ?? [];
        if ($previous['enabled'] !== $enabled) {
            array_unshift($history, [
                'action' => $enabled ? 'enabled' : 'disabled',
                'at' => now()->toIso8601String(),
            ]);
            $history = array_slice($history, 0, 50);
        }

        $this->manager->save([
            'enabled' => $enabled,
            'title' => $validated['title'],
            'message' => $validated['message'],
            'starts_at' => $validated['starts_at'] ?: null,
            'ends_at' => $validated['ends_at'] ?: null,
            'allowed_ips' => $ips,
            'history' => $history,
            'updated_at' => now()->toIso8601String(),
        ]);

        return back()->with('status', 'Maintenance settings saved successfully.');
    }
}