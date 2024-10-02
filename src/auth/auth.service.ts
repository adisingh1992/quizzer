import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';

const fast2sms = require("fast-two-sms");

@Injectable()
export class AuthService {

    constructor(
        private _userService: UserService,
        private _jwtService: JwtService
    ) { }

    async loginAdmin(email: string, password: string) {
        const adminEmail: string = process.env.ADMIN_EMAIL as string;
        const adminPassword: string = process.env.ADMIN_PASSWORD as string;

        if (email !== adminEmail || password !== adminPassword) throw new UnauthorizedException();

        const payload = { sub: email, isAdmin: true };

        return { access_token: await this._jwtService.signAsync(payload) };
    }

    async login(phoneNumber: string) {
        let user = await this._userService.findByPhoneNumber(phoneNumber);

        if (!user) user = await this._userService.create(phoneNumber);

        const FAST2SMS = process.env.FAST2SMS; // FAST2SMS API Key

        const otpValue = this.generateOTP();

        await fast2sms.sendMessage({
            authorization: FAST2SMS,
            message: `You login OTP is ${otpValue}`,
            numbers: [user.phoneNumber]
        });

        await this._userService.updateOTP(user.id, otpValue);

        return user;
    }

    generateOTP() {
        const digits = "0123456789";
        const otp_length = 6;

        let OTP = "";

        for (let i = 0; i < otp_length; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        return OTP;
    }

    async verify(phoneNumber: string, otp: string) {
        if (!otp) throw new BadRequestException('Please provide an OTP');

        const user = await this._userService.findByPhoneNumber(phoneNumber);

        if (!user) throw new BadRequestException('User not found for this number');

        if (otp !== user.otp) throw new UnauthorizedException('Please enter the correct OTP');

        await this._userService.updateOTP(user.id, '');

        const payload = {
            sub: user.id,
            phoneNumber: user.phoneNumber,
            subscriber: user.subscriber
        };

        return { access_token: await this._jwtService.signAsync(payload) };
    }
}
