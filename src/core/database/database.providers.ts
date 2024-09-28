import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { User } from 'src/users/user.entity';
import { Dialect } from 'sequelize';

export const databaseProviders = [{
    provide: SEQUELIZE,

    useFactory: async () => {
        let config;

        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case TEST:
                config = databaseConfig.test;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development;
        }

        const sequelize = new Sequelize(
            config.database as string, config.username as string, config.password,
            {
                host: config.host,
                port: parseInt(config.port as string), dialect: config.dialect as Dialect,
                ssl: true, dialectOptions: { ssl: config.ssl, encrypt: true }
            });

        sequelize.addModels([User]);

        await sequelize.sync();

        return sequelize;
    },
}];