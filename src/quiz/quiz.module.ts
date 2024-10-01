import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { quizProviders } from './quiz.provider';
import { QuestionService } from './questions/question.service';

@Module({
    controllers: [QuizController],
    providers: [QuizService, QuestionService, ...quizProviders]
})
export class QuizModule { }
