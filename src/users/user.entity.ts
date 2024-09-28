import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        autoIncrementIdentity: true,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    countryCode: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    phoneNumber: string;

    @Column({
        type: DataType.STRING
    })
    otp: string;
}