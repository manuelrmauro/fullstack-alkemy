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

router.get('/',authMiddleware, getOperations)
router.get('/resume',authMiddleware, getResume)
router.post('/', authMiddleware, addOperation);
router.put('/:id',authMiddleware, uploadOperation)
router.delete('/:id',authMiddleware, deleteOperation)

module.exports = router;