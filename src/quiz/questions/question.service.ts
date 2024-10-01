import { Inject, Injectable } from '@nestjs/common';
import { QUESTION_REPOSITORY } from 'src/core/constants';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {

    constructor(@Inject(QUESTION_REPOSITORY) private readonly questionRepository: typeof Question) { }

    async create(description: string, img: string, a: string, b: string, c: string, d: string,
        correctAnswer: string, quizId: string
    ) {
        const question: Question = {
            description: description,
            img: img,
            a: a,
            b: b,
            c: c,
            d: d,
            correctAnswer: correctAnswer,
            quizId: quizId
        } as Question;

        return await this.questionRepository.create<Question>(question);
    }

    async findAllByQuiz(quizId: string) {
        return await this.questionRepository.findAll({
            where: { quizId: quizId }, attributes: { exclude: ['correctAnswer'] }
        });
    }

    async deleteById(questionId: string) {
        return await this.questionRepository.destroy({ where: { id: questionId } });
    }
}