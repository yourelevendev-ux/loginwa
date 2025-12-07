# LoginWA PHP SDK

Minimal PHP client for LoginWA OTP API.

## Install

```bash
composer require loginwa/sdk
```

## Usage

```php
<?php
require __DIR__.'/vendor/autoload.php';

use LoginWA\SDK\Client;

$client = new Client(getenv('LOGINWA_API_KEY')); // default base URL https://loginwa.com/api/v1

$start = $client->startOtp([
    'phone' => '6281234567890',
    'country_code' => '62',
]);

$verify = $client->verifyOtp([
    'session_id' => $start['session_id'],
    'otp_code' => '123456',
]);
```

## Methods
- `startOtp(array $payload)` – body: `phone`, optional `country_code`, `otp_length`, `message_template`, `device_id`, `meta`.
- `verifyOtp(array $payload)` – body: `session_id`, `otp_code`.

## Auth
- Header: `Authorization: Bearer <SECRET_API_KEY>`
- Content-Type: `application/json`

## Base URL
- Default `https://loginwa.com/api/v1`
- Override via constructor second argument.

## Error handling
- Throws `RuntimeException` on HTTP error (>=400) or cURL failure. Inspect `$e->getCode()` for HTTP status.
