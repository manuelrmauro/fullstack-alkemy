const { check } = require('express-validator');

const ValidationAuth = {
  login: [
    check('email', 'Ingrese su usuario').isEmail(),
    check('password', 'Ingrese sus password').not().isEmpty(),
  ],
  isAdmin:(request, response, next) => {
    if (request.userRoleId !== 2) {
      return response.status(401).json({
        message: 'No autorizado',
      });
    }

    return next();
  },
};

module.exports = ValidationAuth;
