const dotenv = require('dotenv').config().parsed;
if (dotenv) {
  module.exports = {
    development: {
      username: dotenv.DB_USERNAME,
      password: dotenv.DB_PASSWORD,
      database: dotenv.DB_NAME,
      host: '127.0.0.1',
      dialect: 'postgres',
      // operatorsAliases: false,
    },
    test: {
      username: dotenv.DB_USERNAME_TEST,
      password: dotenv.DB_PASSWORD_TEST,
      database: dotenv.DB_NAME_TEST,
      host: '127.0.0.1',
      dialect: 'postgres',
      // operatorsAliases: false,
    },
    production: {
      username: dotenv.DB_USERNAME,
      password: dotenv.DB_PASSWORD,
      database: dotenv.DB_NAME,
      host: '127.0.0.1',
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      // operatorsAliases: false,
    },
  };
} else {
  throw new Error('.env file is missing');
}
