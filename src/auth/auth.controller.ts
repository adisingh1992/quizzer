import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminLoginRequest, LoginRequest, OTPVerificationRequest } from './login';
import { AuthService } from './auth.service';
import { Public } from './public';

@Public()
@Controller('auth')
export class AuthController {
    constructor(
        private _authService: AuthService
    ) { }

    @Post("login-admin")
    async authenticateAdmin(@Res() res: Response, @Body() adminLoginRequest: AdminLoginRequest) {
        const response = await this._authService.loginAdmin(adminLoginRequest.email, adminLoginRequest.password);

        return res.status(HttpStatus.OK).json(response);
    }

    @Post("login")
    async authenticateUser(@Res() res: Response, @Body() loginRequest: LoginRequest) {
        this._authService.login(loginRequest.userName);

        return res.status(HttpStatus.OK).send();
    }

    @Post("login/verify")
    async verifyOTP(@Res() res: Response, @Body() otpVerificationRequest: OTPVerificationRequest) {
        const response = await this._authService.verify(otpVerificationRequest.userName, otpVerificationRequest.otp);

        return res.status(HttpStatus.ACCEPTED).json(response);
    }
}