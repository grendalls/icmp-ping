const sequelize = require('sequelize').Sequelize;

if (process.env.NODE_ENV === 'production') {
  const { DATABASE_URL } = process.env;
  module.exports = new sequelize(DATABASE_URL, {
    ssl: true,
    dialect: 'postgres',
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  require('dotenv').config();

  const { DB_NAME, DB_PASSWORD, DB_USER, DB_HOST, DB_PORT } = process.env;

  module.exports = new sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    ssl: true,
    dialect: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  });
}
