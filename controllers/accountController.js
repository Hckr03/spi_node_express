const accountService = require('../services/accountService');
const bankService = require('../services/bankService');
const clientService = require('../services/clientService');

class AccountController {
    
    async createAccount(req, res) {
        try {
            const account = req.body;

            const client = await clientService.findById(account.DocNumber);
            const bank = await bankService.findById(account.BankCode);
            const existingAccount = await accountService.findByAccountNumber(account.AccountNumber);

            if (!client) return res.status(404).json({ message: 'Client not found' });
            if (!bank) return res.status(404).json({ message: 'Bank not found' });
            if (existingAccount) return res.status(400).json({ message: 'Account number already exists' });

            const newAccount = {
                accountNumber: account.accountNumber,
                currendy: account.currency,
                balance: account.balance,
                client: client._id,
                bank: bank._id
            };

            await accountService.create(newAccount);
            res.status(201).json({ message: 'Account created successfully' });

        }catch (error) {
            res.status(500).json({ message: "Account not created", error: error.message });
        }
    }

    async findAll(req, res){
        try{
            const accounts = await accountService.findAll();
            return res.status(200).json(accounts);
        }catch(error){
            return res.status(500).json({ message: "Error retrieving accounts", error: error.message });
        }
    }

    async findByAccountNumber(req, res){
        try{
            const { accountNumber } = req.params;
            const account = await accountService.findByAccountNumber(accountNumber);

            if(!account) return res.status(404).json({ message: "Account not found" });
            return res.status(200).json(account);
        }catch(error){
            return res.status(500).json({ message: "Error retrieving account", error: error.message });
        }
    }

    async updateAccount(req, res){
        try{
            const { accountNumber } = req.params;
            const account = req.body;

            if(accountNumber !== account.accountNumber)
                return res.status(400).json({ message: "Account number in params and body do not match" });

            await accountService.update(accountNumber, {
                accountNumber: account.accountNumber,
                balance: account.balance,
                currency: account.currency
            });

            return res.status(200).json({ message: "Account updated successfully" });

        }catch(error){
            return res.status(500).json({ message: "Error updating account", error: error.message });
        }
    }

    async deleteAccount(req, res){
        try{
            const { accountNumber } = req.params;
            const account = await accountService.findByAccountNumber(accountNumber);

            if(!account) return res.status(404).json({ message: "Account not found" });

            await accountService.delete(account._id);
            return res.status(200).json({ message: "Account deleted successfully" });
        }catch(error){
            return res.status(500).json({ message: "Error deleting account", error: error.message });
        }
    }
}

module.exports = new AccountController();