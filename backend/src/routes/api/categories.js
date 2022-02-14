const { Router } = require('express');

const router = new Router();
const {
	addCategory,
	getCategories,
	deleteCategory,
} = require('../../controllers/categoriesController');
const authMiddleware = require('../../middlewares/auth');
const ValidationCategory = require('../../middlewares/validations/validationCategory')

router.get('/', authMiddleware, getCategories);
router.post('/', authMiddleware, ValidationCategory.create, addCategory);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router;
