import { Inject, Injectable } from '@nestjs/common';
import { QUIZ_REPOSITORY } from 'src/core/constants';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizService {

    constructor(@Inject(QUIZ_REPOSITORY) private readonly quizRepository: typeof Quiz) { }

    async create(name: string, timeInMinutes: number, paid: boolean) {
        const quiz: Quiz = {
            name: name,
            timeInMinutes: timeInMinutes,
            paid: paid
        } as Quiz;

        return await this.quizRepository.create<Quiz>(quiz);
    }

    async findAll() {
        return await this.quizRepository.findAll<Quiz>();
    }

    async findByIds(quizIds: string[]) {
        return await this.quizRepository.findAll({
            where: { id: quizIds }
        });
    }

    async deleteById(quizId: string) {
        return await this.quizRepository.destroy({ where: { id: quizId } });
    }
}