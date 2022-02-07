const { Router } = require('express');

const router = new Router();
const { authGoogle } = require('../../controllers/authSocialController');

router.post('/google', authGoogle);

module.exports = router;
