'use strict';
const env = {
    DATABASE_NAME: process.env.DATABASE_NAME || 'locker_kmitl20230401',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'root',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '1234567890',
    DATABASE_PORT: process.env.DATABASE_PORT || 1433,
    DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'mssql',
    DATABASE_INSTANCE: 'SQLExpress',
    NODE_ENV: process.env.NODE_ENV || 'development',
};

module.exports = env;