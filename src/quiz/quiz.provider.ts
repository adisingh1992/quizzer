import { QUIZ_REPOSITORY } from "src/core/constants";
import { Quiz } from "./quiz.entity";

export const quizProviders = [{
    provide: QUIZ_REPOSITORY,
    useValue: Quiz
}];