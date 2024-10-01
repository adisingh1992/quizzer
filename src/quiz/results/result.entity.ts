import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Quiz } from '../quiz.entity';
import { User } from 'src/users/user.entity';
import { Question } from '../questions/question.entity';

@Table
export class Result extends Model<Result> {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    userId: string;

    @ForeignKey(() => Quiz)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    quizId: string;

    @ForeignKey(() => Question)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    questionId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    answer: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    correctAnswer: string;
}