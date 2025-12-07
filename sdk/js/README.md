# @loginwa/sdk (JS)

JavaScript client for LoginWA OTP API.

## Install

```bash
# npm init -y
npm install @loginwa/sdk
```

## Usage (Node / browser with fetch)

```js
import { LoginWAClient, formatPhone } from '@loginwa/sdk';

const client = new LoginWAClient({
  apiKey: process.env.LOGINWA_API_KEY,
  // baseUrl: 'https://loginwa.com/api/v1' // optional
});

async function send() {
  try {
    const start = await client.startOtp({
      phone: formatPhone('6281234567890'),
      countryCode: '62',
    });

    console.log('session_id', start.session_id);

    // then verify user input
    const verify = await client.verifyOtp({
      sessionId: start.session_id,
      otpCode: '123456',
    });
    console.log(verify);
  } catch (err) {
    console.error('OTP error', err?.response?.status, err?.response?.data || err.message);
  }
}

send().catch(console.error);
```

## API
- `startOtp({ phone, countryCode?, otpLength?, messageTemplate?, deviceId?, meta? })`
- `verifyOtp({ sessionId, otpCode })`
- `formatPhone(phone)` helper.

## Auth
- Header: `Authorization: Bearer <SECRET_API_KEY>`
- Content-Type: `application/json`

## Base URL
- Default: `https://loginwa.com/api/v1`
- Override with `baseUrl` if you use a custom endpoint.

## Common errors
- `401 unauthorized` — API key invalid/missing.
- `422 invalid_phone` — phone format not accepted.
- `422 invalid_code` | `expired` | `max_attempts` — verification failed.
- `429 quota_exceeded` — throttle; retry after cooldown.
