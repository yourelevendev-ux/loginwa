# Changelog

## 0.2.0 — Full v1 API coverage
- JS & PHP SDKs expanded from OTP-only to the full v1 surface:
  - Messaging: `sendMessage` (text + image/video/document/audio) and
    convenience helpers, `checkNumbers`.
  - Devices: list/create/get/delete, groups, pairing-code, refresh-qr.
  - Webhooks: full CRUD + regenerate-secret + test.
  - Broadcast: campaigns CRUD + send/pause/resume + contacts.
  - IP whitelist: list/add/remove/toggle.
- PHP: new typed `ApiException` (HTTP status + decoded body) replaces the
  generic `RuntimeException`; supports GET/POST/PUT/DELETE.
- JS: new `LoginWAError` (with `status` and `data`).
- Base URL standardized to `https://api.loginwa.com/api/v1`.
- Postman collection refreshed to the full API (messaging, broadcast, devices,
  webhooks, …).
- OTP (`startOtp`/`verifyOtp`) unchanged and backward compatible.

## 0.1.0 — Initial release
- JavaScript SDK (`sdk/js`) with start/verify OTP helpers.
- PHP SDK (`sdk/php`) with start/verify OTP helpers.
- OTP widget snippet (`sdk/snippet/otp-widget.html`).
- Postman collection (`docs/postman/loginwa-api.postman_collection.json`).
- SDK quick reference and README.
