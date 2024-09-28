export interface IDatabaseConfigAttributes {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string | undefined;
    port: string | undefined;
    dialect?: string | undefined;
    ssl: any;
}

export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
    test: IDatabaseConfigAttributes;
    production: IDatabaseConfigAttributes;
}