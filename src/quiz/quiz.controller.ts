import { Response } from 'express';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizRequest } from './quiz';

@Controller('quiz')
export class QuizController {

    constructor(private _quizService: QuizService) { }

    @Post()
    async createQuiz(@Res() res: Response, @Body() quizRequest: QuizRequest) {
        const response = await this._quizService.create(quizRequest.name, quizRequest.timeInMinutes);

        return res.status(HttpStatus.OK).json(response);
    }

    @Get()
    async getQuizzes(@Res() res: Response) {
        const response = await this._quizService.findAll();

        return res.status(HttpStatus.OK).json(response);
    }
}
