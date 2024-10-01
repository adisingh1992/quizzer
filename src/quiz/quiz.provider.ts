import { QUESTION_REPOSITORY, QUIZ_REPOSITORY } from "src/core/constants";
import { Quiz } from "./quiz.entity";
import { Question } from "./questions/question.entity";

export const quizProviders = [{
    provide: QUIZ_REPOSITORY,
    useValue: Quiz
}, {
    provide: QUESTION_REPOSITORY,
    useValue: Question
}];