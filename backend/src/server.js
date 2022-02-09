const { Op } = require('sequelize');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connection = require('./database/connection');

const Category = require('./models/Category');
const {incomeCategories, expenseCategories} = require('./database/data/categories')


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4001;

    this.environment = process.env.NODE_ENV;

    this.paths = {
      apiv1: '/api/v1',
      frontend: '/',
    };

    this.middlewares();
    this.routes();

    this.incomeCategories = incomeCategories
    this.expenseCategories = expenseCategories
  }

  getExpressInstance() {
    return this.app;
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.use(this.paths.apiv1, require('./routes/api'));
  }

  async connectDb() {
    try {
      console.log('||--> Establishing connection with database: <--||');
      switch (this.environment) {
        case 'production':
          console.log('||--> Production mode setting in: authenticate<--||');
          // await connection.authenticate();
          await connection.sync({ force: true });
          break;
        case 'test':
          console.log('||--> Test mode setting in: force = false<--||');
          await connection.sync({ force: false });
          break;
        case 'development':
        default:
          console.log('||--> Development mode setting in: force = true<--||');
          await connection.sync({ force: true });
          break;
      }
      console.log('||--> Database connection established..: <--||');
    } catch (error) {
      console.log('Could not connect to the database...');
      console.log(error);
    }
  }

  async seedDb() {
    try {
      console.log('||--> Categories seed <--||');
      this.expenseCategories.forEach(async category => {
        console.log('>>>>> Seeding category "' + category +'"')
        await Category.create({name: category, type: 'Expense'})
      })
      this.incomeCategories.forEach(async category => {
        console.log('>>>>> Seeding category "' + category +'"')
        await Category.create({name: category, type: 'Income'})
      })
    } catch (error) {
      console.log('Could not seed the database...');
      console.log(error);
    }
  }

  start() {
    this.app.listen(this.port, async () => {
      await this.connectDb();
      await this.seedDb();
      console.log(`||--> Http server running in port:${this.port} <--||`);
    });
  }
}

module.exports = Server;
