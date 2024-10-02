import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
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
        defaultValue: "+91",
        validate: {
            notEmpty: true
        }
    })
    countryCode: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    })
    phoneNumber: string;

    @Column({
        type: DataType.STRING
    })
    otp: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    subscriber: string;
}