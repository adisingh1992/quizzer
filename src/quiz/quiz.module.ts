import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { quizProviders } from './quiz.provider';
import { QuestionService } from './questions/question.service';
import { ResultService } from './results/result.service';
import { ResultController } from './results/result.controller';

@Module({
    controllers: [QuizController, ResultController],
    providers: [QuizService, QuestionService, ResultService, ...quizProviders]
})
export class QuizModule { }
