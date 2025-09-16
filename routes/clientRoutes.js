const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/', clientController.createClient);
router.get('/', clientController.findAll);
router.get('/:docNum', clientController.findById);
router.put('/:docNum', clientController.update);
router.delete('/:docNum', clientController.deleteClient);

module.exports = router;