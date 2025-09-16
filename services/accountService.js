const BaseService = require('./BaseService');
const Account = require('../models/Account');

class AccountService extends BaseService {
    constructor() {
        super(Account);
    }
clea
    async findByAccountNumber(accountNumber){
        return await this.model.findOne({ accountNumber })
        .populate('client bank'); //se usa este metodo populate para traer los datos de las referencias que hace a otros models
    }

    async updateAccount(accountNumber, newData) {
        const account = await this.model.findByAccountNumber(accountNumber);
        if(!account) throw new Error('Account not found');

        account.accountNumber = newData.accountNumber;
        account.currency = newData.currency;
        account.balance = newData.balance;

        return await account.save();
    }

    async subtractBalance(accountNum, amount) {
        const account = await this.model.findByAccountNumber(accountNum);
        if(!account) throw new Error('Account not found');
        if(account.balance < amount) throw new Error('Insufficient balance');

        account.balance -= amount;
        return await account.save();
    }

    async addBalance(accountNum, amount) {
        const account = await this.model.findByAccountNumber(accountNum);
        if(!account) throw new Error('Account not found');

        account.balance += amount;
        return await account.save();
    }
}

module.exports = new AccountService();