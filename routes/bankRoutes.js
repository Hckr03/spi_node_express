const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');

router.post('/', bankController.createBank);
router.get('/', bankController.findAll);
router.get('/:bankCode', bankController.findByBankCode);
router.put('/:bankCode', bankController.updateBank);
router.delete('/:bankCode', bankController.deleteBank);

module.exports = router;