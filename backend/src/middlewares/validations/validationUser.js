const { check } = require('express-validator');

const ValidationsUser = {
  withPassword: [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'The password must contains 6 or more characters').isLength({
      min: 6,
    }),
  ],
  withoutPassword: [
    check('email', 'Enter a valid email').isEmail(),
  ],
};

module.exports = ValidationsUser;
