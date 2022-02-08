const { check } = require('express-validator');

const ValidationsUser = {
  withPassword: [
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser mínimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  withoutPassword: [
    check('name', 'Ingrese su nombre completo').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
  ],
};

module.exports = ValidationsUser;
