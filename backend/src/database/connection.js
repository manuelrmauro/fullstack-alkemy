const Sequelize = require('sequelize');
const ConfigDB = require('../config/database');

const connection = new Sequelize(ConfigDB);

const User = require('../models/User');
 

// Models Init
User.init(connection);


// Associate
User.associate(connection.models);


module.exports = connection;
