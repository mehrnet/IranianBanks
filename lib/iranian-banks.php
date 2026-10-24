<?php
/**
 * IranianBanks.php - Modern PHP client library for Iranian Banks & Neo-banks Detection & Validation
 * Project: https://github.com/mehrnet/IranianBanks
 * Author: MehrNet (https://mehrnet.com)
 * License: MIT
 */

namespace MehrNet;

class IranianBanks
{
    private static ?array $banks = null;

    public static function all(): array
    {
        if (self::$banks === null) {
            $dataFile = __DIR__ . '/../data/banks.json';
            if (file_exists($dataFile)) {
                self::$banks = json_decode(file_get_contents($dataFile), true) ?? [];
            } else {
                self::$banks = [];
            }
        }
        return self::$banks;
    }

    public static function normalizeDigits(?string $input): string
    {
        if ($input === null || $input === '') return '';
        $fa = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        $ar = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        $en = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        $clean = str_replace($fa, $en, $input);
        return trim(str_replace($ar, $en, $clean));
    }

    public static function isValidCard(?string $cardNumber): bool
    {
        $clean = preg_replace('/[\s-]/', '', self::normalizeDigits($cardNumber));
        if (!preg_match('/^\d{16}$/', $clean)) return false;

        $sum = 0;
        for ($i = 0; $i < 16; $i++) {
            $digit = (int)$clean[$i];
            if ($i % 2 === 0) {
                $digit *= 2;
                if ($digit > 9) $digit -= 9;
            }
            $sum += $digit;
        }
        return ($sum % 10 === 0);
    }

    public static function isValidSheba(?string $sheba): bool
    {
        $clean = strtoupper(preg_replace('/[\s-]/', '', self::normalizeDigits($sheba)));
        if (!preg_match('/^IR\d{24}$/', $clean)) return false;

        $rearranged = substr($clean, 4) . '1827' . substr($clean, 2, 2);
        if (function_exists('bcmod')) {
            return bcmod($rearranged, '97') === '1';
        }
        // Fallback blockwise mod 97
        $remainder = 0;
        $len = strlen($rearranged);
        for ($i = 0; $i < $len; $i += 7) {
            $chunk = $remainder . substr($rearranged, $i, min(7, $len - $i));
            $remainder = (int)$chunk % 97;
        }
        return $remainder === 1;
    }

    public static function detectCard(?string $cardNumber): ?array
    {
        $clean = preg_replace('/[\s-]/', '', self::normalizeDigits($cardNumber));
        if (strlen($clean) < 6) return null;

        $p8 = substr($clean, 0, 8);
        $p6 = substr($clean, 0, 6);
        $banks = self::all();

        // 1. Try 8-digit BINs
        foreach ($banks as $b) {
            if (isset($b['bins']) && in_array($p8, $b['bins'], true)) {
                return $b;
            }
        }

        // 2. Try 6-digit BINs
        foreach ($banks as $b) {
            if (isset($b['bins']) && in_array($p6, $b['bins'], true)) {
                return $b;
            }
        }

        return null;
    }

    public static function detectSheba(?string $sheba): ?array
    {
        $clean = strtoupper(preg_replace('/[\s-]/', '', self::normalizeDigits($sheba)));
        if (str_starts_with($clean, 'IR')) {
            $clean = substr($clean, 2);
        }
        if (strlen($clean) < 5) return null;

        $code = substr($clean, 2, 3);
        foreach (self::all() as $b) {
            if (($b['iban_code'] ?? '') === $code) {
                return $b;
            }
        }
        return null;
    }

    public static function detect(?string $input): ?array
    {
        if (!$input) return null;
        $clean = preg_replace('/[\s-]/', '', self::normalizeDigits($input));
        $upper = strtoupper($clean);

        if (str_starts_with($upper, 'IR') || (strlen($upper) === 24 && ctype_digit($upper))) {
            $full = str_starts_with($upper, 'IR') ? $upper : 'IR' . $upper;
            return [
                'type' => 'sheba',
                'normalized' => $full,
                'valid' => self::isValidSheba($full),
                'bank' => self::detectSheba($full)
            ];
        }

        if (strlen($clean) === 16 && ctype_digit($clean)) {
            return [
                'type' => 'card',
                'normalized' => $clean,
                'valid' => self::isValidCard($clean),
                'bank' => self::detectCard($clean)
            ];
        }

        if (strlen($clean) >= 6 && ctype_digit($clean)) {
            return [
                'type' => 'partial_card',
                'normalized' => $clean,
                'valid' => false,
                'bank' => self::detectCard($clean)
            ];
        }

        return null;
    }

    public static function formatCard(string $cardNumber): string
    {
        $clean = substr(preg_replace('/\D/', '', self::normalizeDigits($cardNumber)), 0, 16);
        return implode('-', str_split($clean, 4));
    }

    public static function formatSheba(string $sheba): string
    {
        $clean = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', self::normalizeDigits($sheba)));
        if (!str_starts_with($clean, 'IR')) $clean = 'IR' . $clean;
        $clean = substr($clean, 0, 26);
        return substr($clean, 0, 2) . ' ' . implode(' ', str_split(substr($clean, 2), 4));
    }
}
