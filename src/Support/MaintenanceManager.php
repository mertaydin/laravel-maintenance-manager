<?php

namespace MertAydin\MaintenanceManager\Support;

use Illuminate\Support\Carbon;
use RuntimeException;

class MaintenanceManager
{
    public function state(): array
    {
        $path = config('maintenance-manager.storage');
        if (! is_file($path)) {
            return $this->defaults();
        }

        $data = json_decode((string) file_get_contents($path), true);

        return is_array($data) ? array_replace($this->defaults(), $data) : $this->defaults();
    }

    public function save(array $data): array
    {
        $state = array_replace($this->defaults(), $data);
        $path = config('maintenance-manager.storage');
        $directory = dirname($path);

        if (! is_dir($directory) && ! mkdir($directory, 0775, true) && ! is_dir($directory)) {
            throw new RuntimeException('Unable to create maintenance manager storage directory.');
        }

        $encoded = json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($encoded === false || file_put_contents($path, $encoded, LOCK_EX) === false) {
            throw new RuntimeException('Unable to save maintenance manager state.');
        }

        return $state;
    }

    public function isActive(): bool
    {
        $state = $this->state();
        if (! $state['enabled']) {
            return false;
        }

        $now = Carbon::now(config('maintenance-manager.timezone'));
        if ($state['starts_at'] && $now->lt(Carbon::parse($state['starts_at'], config('maintenance-manager.timezone')))) {
            return false;
        }
        if ($state['ends_at'] && $now->gte(Carbon::parse($state['ends_at'], config('maintenance-manager.timezone')))) {
            return false;
        }

        return true;
    }

    private function defaults(): array
    {
        return [
            'enabled' => false,
            'title' => 'We will be back soon',
            'message' => 'We are making a few improvements. Please check back shortly.',
            'starts_at' => null,
            'ends_at' => null,
            'allowed_ips' => [],
            'history' => [],
            'updated_at' => null,
        ];
    }
}