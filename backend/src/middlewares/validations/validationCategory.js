const { check, oneOf } = require('express-validator');

const ValidationCategory = {
  create: [
    check('name', 'Enter a name').notEmpty(),
    oneOf([
      check('type').equals('Income'),
      check('type').equals('Expense'),
    ], 'Enter a valid type'),
  ]
};

module.exports = ValidationCategory;
