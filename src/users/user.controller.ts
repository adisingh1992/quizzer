import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private _userService: UserService) { }

    @Get()
    async getAllUsers(@Res() res: Response) {
        const response = await this._userService.findAll();

        return res.status(HttpStatus.OK).json(response);
    }
}