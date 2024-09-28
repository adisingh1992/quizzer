export interface LoginRequest {
    userName: string; // email or phoneNumber
}

export interface OTPVerificationRequest {
    userName: string; // email or phoneNumber

    otp: string;
}