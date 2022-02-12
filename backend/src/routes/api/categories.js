const { Router } = require('express');

const router = new Router();
const {
	addCategory,
	getCategories,
	deleteCategory,
} = require('../../controllers/categoriesController');
const authMiddleware = require('../../middlewares/auth');

router.get('/', authMiddleware, getCategories);
router.post('/', authMiddleware, addCategory);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router;
