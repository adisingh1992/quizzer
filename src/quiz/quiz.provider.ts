import { QUESTION_REPOSITORY, QUIZ_REPOSITORY, RESULT_REPOSITORY } from "src/core/constants";
import { Quiz } from "./quiz.entity";
import { Question } from "./questions/question.entity";
import { Result } from "./results/result.entity";

export const quizProviders = [{
    provide: QUIZ_REPOSITORY,
    useValue: Quiz
}, {
    provide: QUESTION_REPOSITORY,
    useValue: Question
}, {
    provide: RESULT_REPOSITORY,
    useValue: Result
}];