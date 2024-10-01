export interface QuizRequest {
    name: string;

    timeInMinutes: number;
}

export interface QuestionRequest {
    description: string;

    img: string;

    a: string;

    b: string;

    c: string;

    d: string;

    correctAnswer: string;

    quizId: string
}

export interface AnswerRequest {
    quizId: string;

    questionId: string;

    answer: string;
}