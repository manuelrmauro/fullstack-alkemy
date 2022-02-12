const { Router } = require('express');

const userRoutes = require('./user');
const authRoutes = require('./auth');
const operationsRoutes = require('./operations');
const categoriesRoutes = require('./categories');

const router = new Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/operations', operationsRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;
