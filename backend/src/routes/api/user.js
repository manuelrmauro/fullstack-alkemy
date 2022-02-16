const { Router } = require('express');

const router = new Router();
const {
	createUser,
	getUser,
	validate,
} = require('../../controllers/userController');
const { confirmarMail } = require('../../controllers/nodemailerController');
const authMiddleware = require('../../middlewares/auth');
const ValidationsUser = require('../../middlewares/validations/validationUser');

router.post('/', ValidationsUser.withPassword, createUser);
router.get('/', authMiddleware, getUser);
router.post('/validate/:id/:usercode', validate);
router.post('/validate/', confirmarMail);

module.exports = router;
