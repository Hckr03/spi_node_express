const BaseService = require('./BaseService');
const Bank = require('../models/Bank');

class BankService extends BaseService {
    constructor() {
        super(Bank);
    }

    async findByCode(bankCode) {
        return await this.model.findByOne({ bankCode })
        .populate('accounts');
    }

    async updateByCode(bankCode, newData) {
        const bank = await this.model.findByCode(bankCode);
        if(!bank) throw new Error('Bank not found');
        
        bank.bankCode = newData.bankCode;
        bank.name = newData.name;
        bank.address = newData.address;

        return await bank.save();
    }

    async addAccount(bankId, accountId) {
        const bank = await this.model.findById(bankId);
        if(!bank) throw new Error('Bank not found');

        if(!bank.accounts.includes(accountId)) {
            bank.accounts.push(accountId);
            return await bank.save();
        }
        return bank;
    }

    async deleteAccount(bankId, accountId) {
        const bank = await this.model.findById(bankId);
        if(!bank) throw new Error('Bank not found');

        bank.accounts = bank.accounts.filter(accId => accId.toString() !== accountId);
        return await bank.save();
    }
}

module.exports = new BankService();