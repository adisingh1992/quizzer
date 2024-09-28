import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { usersProviders } from './users.provider';

@Module({
    controllers: [UserController],
    providers: [UserService, ...usersProviders],
    exports: [UserService],
    imports: []
})
export class UsersModule { }
