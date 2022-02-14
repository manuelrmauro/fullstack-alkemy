const { check, oneOf } = require('express-validator');

const ValidationOperation = {
  create: [
    check('concept', 'Enter a concept').notEmpty(),
    oneOf([
      check('type').equals('Income'),
      check('type').equals('Expense'),
    ], 'Enter a valid type'),
    check('amount', 'Enter an amount').notEmpty().isInt({min: 1}),
    check('date','Enter a valid date').isDate(),
    check('category', 'Enter a category').notEmpty().isNumeric()
  ],
  update: [
    check('concept', 'Enter a concept').notEmpty(),
    check('amount', 'Enter an amount').notEmpty().isInt({min: 1}),
    check('date','Enter a valid date').isDate(),
    check('category', 'Enter a category').notEmpty().isNumeric()
  ]
};

module.exports = ValidationOperation;