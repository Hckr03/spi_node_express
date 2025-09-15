const accountService = require('../services/accountService');
const bankService = require('../services/bankService');

class BankController{

    async createBank(req, res){
        try{
            const bank = req.body;
            const existingBank = await bankService.findById(bank.bankCode);

            if(existingBank) return res.status(400).json({ message: `Bank code ${bank.bankCode} already exists` });

            const newBank = {
                bankCode: bank.bankCode,
                name: bank.name,
                address: bank.address
            };

            await bankService.create(newBank);
            res.status(201).json({ message: 'Bank created successfully' });
        }catch(error){
            res.status(500).json({ message: "Bank not created", error: error.message });
        }
    }

    async findAll(req, res){
        try{
            const banks = await bankService.findAll();
            return res.status(200).json(banks);
        }catch(error){
            return res.status(500).json({ message: "Error retrieving banks", error: error.message });
        }
    }

    async findByBankCode(req, res){
        try{
            const { bankCode } = req.params;
            const bank = await bankService.findById(bankCode);

            if(!bank) return res.status(404).json({ message: "Bank not found" });
            return res.status(200).json(bank);
        }catch(error){
            return res.status(500).json({ message: "Error retrieving bank", error: error.message });
        }
    }

    async updateBank(req, res){
        try{
            const { bankCode } = req.params;
            const bank = req.body;
            
            if(bankCode !== bank.bankCode)
                return res.status(400).json({ message: "Bank code in URL and body do not match" });

            const bankToUpdate = await bankService.findByBankCode(bankCode);
            if(!bankToUpdate) return res.status(404).json({ message: "Bank not found" });

            await bankService.update(bankCode, bank);
            return res.status(200).json({ message: "Bank updated successfully" });
        }catch(error){
            return res.status(500).json({ message: "Error updating bank", error: error.message });
        }
    }

    async deleteBank(req, res){
        try{
            const { bankCode } = req.params;
            const bank = await bankService.findByCode(bankCode);

            if(!bank) return res.status(404).json({ message: "Bank not found" });

            await bankService.delete(bank._id);
            return res.status(200).json({ message: "Bank deleted successfully" });
        } catch(error){
            return res.status(500).json({ message: "Error deleting bank", error: error.message });
        }
    }
}

module.exports = new BankController();