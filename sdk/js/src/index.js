const DEFAULT_BASE_URL = 'https://loginwa.com/api/v1';

function buildHeaders(apiKey) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };
}

async function request(apiKey, path, body = {}, baseUrl = DEFAULT_BASE_URL) {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: buildHeaders(apiKey),
    body: JSON.stringify(body),
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    // ignore json parse error, will throw below
  }

  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export class LoginWAClient {
  constructor({ apiKey, baseUrl = DEFAULT_BASE_URL } = {}) {
    if (!apiKey) throw new Error('apiKey is required');
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  /**
   * Start OTP flow
   * @param {Object} params
   * @param {string} params.phone - phone number, e.g. 6281234567890
   * @param {string} [params.countryCode] - e.g. 62
   * @param {number} [params.otpLength] - default 6
   * @param {string} [params.messageTemplate] - override template
   * @param {string} [params.deviceId] - optional specific device
   * @param {Object} [params.meta] - extra metadata
   */
  async startOtp(params) {
    return request(this.apiKey, '/auth/start', {
      phone: params.phone,
      country_code: params.countryCode,
      otp_length: params.otpLength,
      message_template: params.messageTemplate,
      device_id: params.deviceId,
      meta: params.meta,
    }, this.baseUrl);
  }

  /**
   * Verify OTP
   * @param {Object} params
   * @param {string} params.sessionId
   * @param {string} params.otpCode
   */
  async verifyOtp(params) {
    return request(this.apiKey, '/auth/verify', {
      session_id: params.sessionId,
      otp_code: params.otpCode,
    }, this.baseUrl);
  }
}

export function formatPhone(phone) {
  return (phone || '').replace(/[^0-9]/g, '');
}

export default LoginWAClient;
