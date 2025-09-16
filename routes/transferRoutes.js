const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferControllers');

router.post('/', transferController.createTransfer);
router.get('/', transferController.findAll);
router.get('/:status', transferController.findAllByStatus);
router.get('/sent', transferController.findAllSent);
router.get('/received', transferController.findAllReceived);
router.put('/status/:id', transferController.updateStatus);
router.delete('/:id', transferController.deleteTransfer);

module.exports = router;