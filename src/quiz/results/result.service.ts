import { Inject, Injectable } from '@nestjs/common';
import { RESULT_REPOSITORY } from 'src/core/constants';
import { Result } from './result.entity';
import { Sequelize } from 'sequelize';
import { QuizService } from '../quiz.service';

@Injectable()
export class ResultService {

    constructor(
        @Inject(RESULT_REPOSITORY) private readonly resultRepository: typeof Result,
        private _quizService: QuizService
    ) { }

    async create(userId: string, quizId: string, questionId: string,
        answer: string, correctAnswer: string) {

        const result = {
            userId: userId,
            quizId: quizId,
            questionId: questionId,
            answer: answer,
            correctAnswer: correctAnswer,
        } as Result;

        await this.resultRepository.create<Result>(result);
    }

    async findSubmittedQuizzesByUserId(userId: string) {
        const results = await this.resultRepository.findAll({
            where: { userId: userId },
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('quizId')), 'quizId']]
        });

        const quizIds = results.map(result => result.quizId);

        return await this._quizService.findByIds(quizIds);
    }

    async findSubmittedAnswersForQuiz(userId: string, quizId: string) {
        const results = await this.resultRepository.findAll({
            where: { userId: userId, quizId: quizId }
        });

        return results.map(result => {
            return {
                userId: result.userId,
                quizId: result.quizId,
                questionId: result.questionId,
                answer: result.answer,
                isCorrect: result.answer === result.correctAnswer,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            };
        });
    }
}