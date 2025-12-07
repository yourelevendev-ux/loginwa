# LoginWA Client SDKs & Tools

Client-side assets for integrating LoginWA OTP via WhatsApp. Includes JavaScript and PHP SDKs, an embeddable OTP widget, and a Postman collection. No server code is included.

## Contents
- `sdk/js` — JavaScript SDK (ESM), minimal dependency-free client.
- `sdk/php` — PHP SDK (cURL-based, PHP \>= 8.0).
- `sdk/snippet/otp-widget.html` — drop-in OTP widget example.
- `docs/postman/loginwa-api.postman_collection.json` — Postman collection.
- `docs/sdk.md` — quick reference for these assets.

## API Basics
- Base URL: `https://loginwa.com/api/v1`
- Auth: `Authorization: Bearer <YOUR_API_KEY>`
- Content-Type: `application/json`

## Quick Start
### JavaScript SDK
```bash
cd sdk/js
npm install
# import into your app (ESM)
```
```js
import { LoginWAClient } from '@loginwa/sdk';
const client = new LoginWAClient({ apiKey: process.env.LOGINWA_API_KEY });
const start = await client.startOtp({ phone: '6281234567890', countryCode: '62' });
const verify = await client.verifyOtp({ sessionId: start.session_id, otpCode: '123456' });
```

### PHP SDK
```bash
cd sdk/php
composer install
```
```php
<?php
require __DIR__ . '/vendor/autoload.php';
$client = new LoginWA\SDK\Client('YOUR_API_KEY');
$start = $client->startOtp(['phone' => '6281234567890', 'country_code' => '62']);
$verify = $client->verifyOtp(['session_id' => $start['session_id'], 'otp_code' => '123456']);
```

### OTP Widget Snippet
Open `sdk/snippet/otp-widget.html`, set your API key/Base URL, and embed in any page. Uses Fetch to call `/auth/start` and `/auth/verify`.

### Postman Collection
Import `docs/postman/loginwa-api.postman_collection.json`, set `baseUrl` (default `https://loginwa.com/api/v1`) and `apiKey` variables, then run start/verify flows.

## Download
Packaged ZIP (same contents as this repo): `https://loginwa.com/loginwa-batch1-sdk.zip`

## Support
Questions/feedback: support@loginwa.com
