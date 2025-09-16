const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/', clientController.createClient);
router.get('/', clientController.findAll);
router.get('/:docNumber', clientController.findById);
router.put('/:docNumber', clientController.update);
router.delete('/:docNumber', clientController.deleteClient);

module.exports = router;