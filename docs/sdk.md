# LoginWA SDKs & Tools

Quick reference for the JavaScript and PHP SDKs. Both cover the full v1 API:
OTP, messaging (text + media), number check, devices, webhooks, broadcast
campaigns, and the IP whitelist. For the complete method list see
`sdk/js/README.md` and `sdk/php/README.md`.

## JS SDK
- Path: `sdk/js` — Entry: `src/index.js` (ESM)
- Install: `npm install @loginwa/sdk`
```js
import LoginWAClient, { LoginWAError } from '@loginwa/sdk';
const wa = new LoginWAClient({ apiKey: 'YOUR_API_KEY' });

// messaging
await wa.sendText({ phone: '6281234567890', message: 'Hello!' });
await wa.sendImage({ phone: '6281234567890', mediaUrl: 'https://cdn.example.com/a.jpg', caption: 'Hi' });

// OTP
const start = await wa.startOtp({ phone: '6281234567890' });
const verify = await wa.verifyOtp({ sessionId: start.session_id, otpCode: '123456' });
```

## PHP SDK
- Path: `sdk/php`
- Install: `composer require loginwa/sdk`
```php
use LoginWA\SDK\Client;
use LoginWA\SDK\ApiException;

$wa = new Client('YOUR_API_KEY');
try {
    $wa->sendMessage(['phone' => '6281234567890', 'message' => 'Hello!']);
    $start  = $wa->startOtp(['phone' => '6281234567890']);
    $verify = $wa->verifyOtp(['session_id' => $start['session_id'], 'otp_code' => '123456']);
} catch (ApiException $e) {
    echo $e->getCode() . ' ' . $e->getMessage();
}
```

## Broadcast (both SDKs)
Create a campaign with an inline contact list, then start it:
```js
const c = await wa.createCampaign({
  name: 'May promo',
  message: 'Hi {{name}}, enjoy 20% off!',
  contacts: [{ phone: '6281234567890', name: 'Andi', variables: { name: 'Andi' } }],
});
await wa.sendCampaign(c.data.id);
```

## OTP widget snippet
- Path: `sdk/snippet/otp-widget.html`
- HTML/JS embed; set the API key and call `/auth/start` + `/auth/verify` via fetch.

## Postman
- Path: `docs/postman/loginwa-api.postman_collection.json`
- Variables: `base_url` (default `https://api.loginwa.com`), `api_key`.

## Auth & headers
- `Authorization: Bearer <SECRET_API_KEY>`
- `Content-Type: application/json`

## Base URL
- Default `https://api.loginwa.com/api/v1` (overridable in the SDK constructor).

## Common errors
- `401 unauthorized` — missing/invalid API key.
- `422 validation_failed` — invalid request parameters.
- `429 quota_exceeded` — monthly quota exceeded for this key.
- `503 no_device_connected` — connect a WhatsApp device first.
- Network/timeout — retry with backoff; the SDK throws with the HTTP status in
  the error object (`err.status`) / exception code (`$e->getCode()`).

## Changelog
See `../CHANGELOG.md`. Latest: `0.2.0` — full v1 API coverage.
