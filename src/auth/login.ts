export interface AdminLoginRequest {
    email: string;

    password: string;
}

export interface LoginRequest {
    userName: string; // email or phoneNumber
}

export interface OTPVerificationRequest {
    userName: string; // email or phoneNumber

    otp: string;
}