const { Router } = require('express');

const userRoutes = require('./user');
const authRoutes = require('./auth');
const operationsRoutes = require('./operations');
const categoriesRoutes = require('./categories');
const authSocialRoutes = require('./authSocial');

const router = new Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/auth/social', authSocialRoutes);
router.use('/operations', operationsRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;
