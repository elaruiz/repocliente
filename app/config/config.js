import { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } from "../constants"

module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'data',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  },
  test: {
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres'
  }
};
