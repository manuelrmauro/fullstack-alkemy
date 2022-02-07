const Sequelize = require('sequelize');
const ConfigDB = require('../config/database');

const connection = new Sequelize(ConfigDB);

// const CompanyType = require('../models/CompanyType');
 

// Models Init

// CompanyType.init(connection);


// Associate
// Company.associate(connection.models);


module.exports = connection;
