<?php

namespace MertAydin\MaintenanceManager\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Illuminate\View\View;
use MertAydin\MaintenanceManager\Support\MaintenanceManager;

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
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'remove_image' => ['nullable', 'boolean'],
        ]);

        $ips = preg_split('/[\r\n,]+/', (string) ($validated['allowed_ips'] ?? ''), -1, PREG_SPLIT_NO_EMPTY);
        $ips = array_values(array_filter(array_map('trim', $ips), fn ($ip) => filter_var($ip, FILTER_VALIDATE_IP)));

        $previous = $this->manager->state();
        $image = $previous['image'] ?? null;
        $imageToDelete = null;

        if ($request->boolean('remove_image') && ! $request->hasFile('image')) {
            $storedImage = $previous['image'] ?? null;
            $uploadDirectory = public_path('vendor/maintenance-manager/uploads');
            $storedPath = $storedImage ? public_path($storedImage) : null;
            $realDirectory = realpath($uploadDirectory);
            $realStoredPath = $storedPath ? realpath($storedPath) : false;

            if ($realDirectory && $realStoredPath && is_file($realStoredPath)
                && str_starts_with($realStoredPath, $realDirectory.DIRECTORY_SEPARATOR)) {
                $imageToDelete = $realStoredPath;
            }

            $image = null;
        }

        if ($request->hasFile('image')) {
            $directory = public_path('vendor/maintenance-manager/uploads');
            if (! is_dir($directory)) {
                mkdir($directory, 0755, true);
            }

            $fileName = Str::uuid().'.'.$request->file('image')->extension();
            $request->file('image')->move($directory, $fileName);
            $image = 'vendor/maintenance-manager/uploads/'.$fileName;
        }

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
            'image' => $image,
            'history' => $history,
            'updated_at' => now()->toIso8601String(),
        ]);

        if ($imageToDelete && is_file($imageToDelete)) {
            unlink($imageToDelete);
        }

        return back()->with('status', 'Maintenance settings saved successfully.');
    }
}