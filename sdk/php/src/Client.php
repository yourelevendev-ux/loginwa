<?php

namespace LoginWA\SDK;

class Client
{
    protected string $apiKey;
    protected string $baseUrl;

    public function __construct(string $apiKey, string $baseUrl = 'https://loginwa.com/api/v1')
    {
        $this->apiKey = $apiKey;
        $this->baseUrl = rtrim($baseUrl, '/');
    }

    /**
     * @param array<string, mixed> $payload
     * @return array<string, mixed>
     */
    public function startOtp(array $payload): array
    {
        return $this->post('/auth/start', $payload);
    }

    /**
     * @param array<string, mixed> $payload
     * @return array<string, mixed>
     */
    public function verifyOtp(array $payload): array
    {
        return $this->post('/auth/verify', $payload);
    }

    /**
     * @param array<string, mixed> $payload
     * @return array<string, mixed>
     */
    protected function post(string $path, array $payload): array
    {
        $url = $this->baseUrl . $path;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->apiKey,
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

        $response = curl_exec($ch);
        $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            throw new \RuntimeException('cURL error: ' . $error);
        }
        curl_close($ch);

        $data = json_decode($response, true);
        if ($httpCode >= 400) {
            $msg = is_array($data) && isset($data['message']) ? $data['message'] : 'HTTP ' . $httpCode;
            $ex = new \RuntimeException($msg, $httpCode);
            if (is_array($data)) {
                $ex->data = $data;
            }
            throw $ex;
        }

        return is_array($data) ? $data : ['raw' => $response];
    }
}
