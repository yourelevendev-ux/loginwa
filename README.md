# LoginWA Client SDKs & Tools

Client-side assets for integrating the [LoginWA](https://loginwa.com) WhatsApp
API. Includes JavaScript and PHP SDKs, an embeddable OTP widget, and a Postman
collection. No server code is included.

The SDKs cover the full v1 API: OTP, messaging (text + media), number check,
devices (QR & pairing-code linking, groups), webhooks, broadcast campaigns, and
the IP whitelist.

## Contents
- `sdk/js` — JavaScript SDK (ESM), dependency-free client.
- `sdk/php` — PHP SDK (cURL-based, PHP >= 8.0).
- `sdk/snippet/otp-widget.html` — drop-in OTP widget example.
- `docs/postman/loginwa-api.postman_collection.json` — Postman collection.
- `docs/sdk.md` — quick reference for these assets.

## API basics
- Base URL: `https://api.loginwa.com/api/v1`
- Auth: `Authorization: Bearer <YOUR_API_KEY>`
- Content-Type: `application/json`

## Quick start

### JavaScript SDK
```bash
cd sdk/js
npm install
```
```js
import LoginWAClient, { LoginWAError } from '@loginwa/sdk';

const wa = new LoginWAClient({ apiKey: process.env.LOGINWA_API_KEY });

// Send a message (text or media)
await wa.sendText({ phone: '6281234567890', message: 'Hello from LoginWA!' });
await wa.sendImage({ phone: '6281234567890', mediaUrl: 'https://cdn.example.com/promo.jpg', caption: 'Promo!' });

// OTP
try {
  const start = await wa.startOtp({ phone: '6281234567890' });
  const verify = await wa.verifyOtp({ sessionId: start.session_id, otpCode: '123456' });
  console.log('verified', verify);
} catch (err) {
  if (err instanceof LoginWAError) console.error(err.status, err.message, err.data);
}
```

### PHP SDK
```bash
cd sdk/php
composer install
```
```php
<?php
require __DIR__ . '/vendor/autoload.php';

use LoginWA\SDK\Client;
use LoginWA\SDK\ApiException;

$wa = new Client('YOUR_API_KEY');

try {
    $wa->sendMessage(['phone' => '6281234567890', 'message' => 'Hello from LoginWA!']);

    $start  = $wa->startOtp(['phone' => '6281234567890']);
    $verify = $wa->verifyOtp(['session_id' => $start['session_id'], 'otp_code' => '123456']);
} catch (ApiException $e) {
    // HTTP status is in $e->getCode(); JSON body in $e->data
    echo $e->getCode() . ' ' . $e->getMessage();
}
```

See `sdk/js/README.md` and `sdk/php/README.md` for the full method list
(messaging, broadcast, devices, webhooks, …).

### OTP widget snippet
Open `sdk/snippet/otp-widget.html`, set your API key, and embed in any page. It
uses Fetch to call `/auth/start` and `/auth/verify`.

### Postman collection
Import `docs/postman/loginwa-api.postman_collection.json`, set the `base_url`
(default `https://api.loginwa.com`) and `api_key` variables, then run the
requests.

## Common errors
- `401 unauthorized` — missing/invalid API key.
- `422 validation_failed` — invalid request parameters (see `errors`).
- `429 quota_exceeded` — monthly quota exceeded for this key.
- `503 no_device_connected` — connect a WhatsApp device in the dashboard first.
- Network/timeout — retry with backoff; the SDK throws with the HTTP status in
  the error object (`err.status`) / exception code (`$e->getCode()`).

## Download
Packaged ZIP (same SDK contents, plus the Android SDK and OpenAPI spec):
`https://loginwa.com/loginwa-batch1-sdk.zip`

## Changelog
See [CHANGELOG.md](CHANGELOG.md). Latest: `0.2.0` — full v1 API coverage.

## Support
Questions/feedback: dev@loginwa.com
