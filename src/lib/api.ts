const API_BASE_URL = 'https://058d43a6cb4c.ngrok-free.app/africastalking';

export interface OTPRequest {
  phone_number: string;
}

export const otpService = {
  requestOTP: async (phoneNumber: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumber
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to send OTP');
    }

    return await response.json();
  },

  // You can add more OTP related methods here if needed
  // For example: verifyOTP, resendOTP, etc.
};
