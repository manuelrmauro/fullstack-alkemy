const { Router } = require('express');

const router = new Router();
const {
  addOperation,
  getOperations,
  uploadOperation,
  deleteOperation
} = require('../../controllers/operationsController');
const authMiddleware = require('../../middlewares/auth');

router.get('/',authMiddleware, getOperations)
router.post('/', authMiddleware, addOperation);
router.put('/:id',authMiddleware, uploadOperation)
router.delete('/:id',authMiddleware, deleteOperation)

module.exports = router;