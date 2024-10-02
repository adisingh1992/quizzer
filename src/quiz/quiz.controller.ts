import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuestionRequest, QuizRequest } from './quiz';
import { QuestionService } from './questions/question.service';

@Controller('quiz')
export class QuizController {

    constructor(
        private _quizService: QuizService,
        private _questionService: QuestionService
    ) { }

    @Post()
    async createQuiz(@Res() res: Response, @Body() quizRequest: QuizRequest) {
        const response = await this._quizService.create(quizRequest.name, quizRequest.timeInMinutes, quizRequest.paid);

        return res.status(HttpStatus.CREATED).json(response);
    }

    @Get()
    async getQuizzes(@Res() res: Response) {
        const response = await this._quizService.findAll();

        return res.status(HttpStatus.OK).json(response);
    }

    @Get(':quizId/questions')
    async getQuestionsByQuiz(@Res() res: Response, @Param() params: any) {
        const response = await this._questionService.findAllByQuiz(params.quizId);

        return res.status(HttpStatus.OK).json(response);
    }

    @Post('question')
    async createQuestion(@Res() res: Response, @Body() questionRequest: QuestionRequest) {
        const response = await this._questionService.create(questionRequest.description, questionRequest.img,
            questionRequest.a, questionRequest.b, questionRequest.c, questionRequest.d,
            questionRequest.correctAnswer, questionRequest.quizId
        );

        return res.status(HttpStatus.CREATED).json(response);
    }

    @Delete('question/:questionId')
    async deleteQuestion(@Res() res: Response, @Param() params: any) {
        const questionId: string = params.questionId;

        await this._questionService.deleteById(questionId);

        return res.status(HttpStatus.ACCEPTED).send();
    }

    @Delete(':quizId')
    async deleteQuiz(@Res() res: Response, @Param() params: any) {
        const quizId: string = params.quizId;

        await this._quizService.deleteById(quizId);

        return res.status(HttpStatus.ACCEPTED).send();
    }
}
