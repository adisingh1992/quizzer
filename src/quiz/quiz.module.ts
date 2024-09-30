import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { quizProviders } from './quiz.provider';

@Module({
    controllers: [QuizController],
    providers: [QuizService, ...quizProviders],
    exports: [QuizService],
    imports: []
})
export class QuizModule { }
