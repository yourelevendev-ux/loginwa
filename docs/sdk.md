# LoginWA SDKs & Tools

Batch 1 deliverables for non-WordPress users.

## JS SDK
- Path: `sdk/js`
- Entry: `src/index.js`
- Install: `npm install @loginwa/sdk` (local package)
- Usage:
```js
import { LoginWAClient } from '@loginwa/sdk';
const client = new LoginWAClient({ apiKey: 'YOUR_API_KEY' });
const start = await client.startOtp({ phone: '6281234567890', countryCode: '62' });
const verify = await client.verifyOtp({ sessionId: start.session_id, otpCode: '123456' });
```

## PHP SDK
- Path: `sdk/php`
- Install: `composer require loginwa/sdk` (local package)
- Usage:
```php
$client = new LoginWA\SDK\Client('YOUR_API_KEY');
$start = $client->startOtp(['phone' => '6281234567890', 'country_code' => '62']);
$verify = $client->verifyOtp(['session_id' => $start['session_id'], 'otp_code' => '123456']);
```

## OTP Widget Snippet
- Path: `sdk/snippet/otp-widget.html`
- HTML/JS embed; set API key and call /auth/start + /auth/verify via fetch.

## Postman
- Path: `docs/postman/loginwa-api.postman_collection.json`
- Variables: `baseUrl` (default `https://loginwa.com/api/v1`), `apiKey`.

## Auth & Headers
- `Authorization: Bearer <SECRET_API_KEY>`
- `Content-Type: application/json`

## Base URL
- Default `https://loginwa.com/api/v1` (overrideable in SDK constructor).
