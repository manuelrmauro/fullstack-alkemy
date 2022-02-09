const { Router } = require('express');

const router = new Router();
const {
  createUser,
} = require('../../controllers/userController');
const ValidationsUser = require('../../middlewares/validations/validationUser');
const authMiddleware = require('../../middlewares/auth');

router.post('/', ValidationsUser.withPassword, createUser);

module.exports = router;
