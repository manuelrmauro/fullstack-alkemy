require('dotenv').config();

const dbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  logging: false,
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  define: {
    timestamp: true,
    underscored: true,
  },
};

switch (process.env.NODE_ENV) {
  case 'production':
    dbConfig.logging = false;
    dbConfig.dialectOptions = {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    };
    break;
  case 'test':
    dbConfig.logging = console.log;
    break;
  case 'development':
  default:
    dbConfig.logging = console.log;
    break;
}
module.exports = dbConfig;
