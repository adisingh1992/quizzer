import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Quiz extends Model<Quiz> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 60
    })
    timeInMinutes: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    paid: boolean;
}