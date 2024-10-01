import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { QuestionService } from "../questions/question.service";
import { AnswerRequest } from "../quiz";
import { ResultService } from "./result.service";

@Controller('result')
export class ResultController {

    constructor(
        private _questionService: QuestionService,
        private _resultService: ResultService
    ) { }

    @Post()
    async saveAnswer(@Req() req: any, @Res() res: Response, @Body() answerRequest: AnswerRequest) {
        const userId: string = req?.user?.sub;

        const question = await this._questionService.findById(answerRequest.questionId);

        if (null == question) throw new BadRequestException("Question not found");

        this._resultService.create(userId, answerRequest.quizId,
            answerRequest.questionId, answerRequest.answer, question.correctAnswer);

        return res.status(HttpStatus.CREATED).send();
    }

    @Get()
    async getSubmittedQuizzes(@Req() req: any, @Res() res: Response) {
        const userId: string = req?.user?.sub;

        const response = await this._resultService.findSubmittedQuizzesByUserId(userId);

        return res.status(HttpStatus.OK).json(response);
    }

    @Get(':quizId')
    async getSubmittedQuizById(@Req() req: any, @Res() res: Response, @Param() params: any) {
        const userId: string = req?.user?.sub;
        const quizId: string = params.quizId;

        const response = await this._resultService.findSubmittedAnswersForQuiz(userId, quizId);

        return res.status(HttpStatus.OK).json(response);
    }
}