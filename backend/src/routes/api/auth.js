const { Router } = require('express');

const router = new Router();
const { userLogin, renewToken } = require('../../controllers/authController');
const ValidationAuth = require('../../middlewares/validations/validationAuth');
const authMiddleware = require('../../middlewares/auth');

router.post('/', ValidationAuth.login, userLogin);
router.get('/renew', authMiddleware, renewToken);

module.exports = router;
