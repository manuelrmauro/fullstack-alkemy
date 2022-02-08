const Sequelize = require('sequelize');
const ConfigDB = require('../config/database');

const connection = new Sequelize(ConfigDB);

const User = require('../models/User');
const Category = require('../models/Category');
const Operation = require('../models/Operation');
 

// Models Init
User.init(connection);
Category.init(connection);
Operation.init(connection);


// Associate
User.associate(connection.models);
Category.associate(connection.models);
Operation.associate(connection.models);


module.exports = connection;
