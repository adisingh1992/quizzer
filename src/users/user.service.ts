import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(phoneNumber: string): Promise<User> {
        const user: any = {
            phoneNumber: phoneNumber,
            countryCode: "+91"
        };

        return await this.userRepository.create<User>(user);
    }

    async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
        return this.userRepository.findOne<User>({ where: { phoneNumber: phoneNumber } });
    }

    async updateOTP(id: string, otp: string) {
        return this.userRepository.update({ otp: otp }, { where: { id: id } });
    }

    async findAll() {
        return this.userRepository.findAll({
            attributes: { exclude: ['otp'] }
        });
    }
}