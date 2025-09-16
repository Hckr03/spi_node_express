const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/', accountController.createAccount);
router.get('/', accountController.findAll);
router.get('/:accountNum', accountController.findByAccountNumber);
router.put('/:accountNum', accountController.updateAccount);
router.delete('/:accountNum', accountController.deleteAccount);

module.exports = router;