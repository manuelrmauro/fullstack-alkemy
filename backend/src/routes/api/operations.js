const { Router } = require('express');

const router = new Router();
const {
  addOperation,
  getOperations,
  getResume,
  uploadOperation,
  deleteOperation
} = require('../../controllers/operationsController');
const authMiddleware = require('../../middlewares/auth');
const ValidationOperation = require('../../middlewares/validations/validationOperation')

router.get('/',authMiddleware, getOperations)
router.get('/resume',authMiddleware, getResume)
router.post('/', authMiddleware, ValidationOperation.create, addOperation);
router.put('/:id',authMiddleware, ValidationOperation.update, uploadOperation)
router.delete('/:id',authMiddleware, deleteOperation)

module.exports = router;