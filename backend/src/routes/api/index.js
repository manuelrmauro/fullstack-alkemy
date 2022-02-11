const { Router } = require('express');

const userRoutes = require('./user');
const authRoutes = require('./auth');

const router = new Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
