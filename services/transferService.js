const BaseService = require('./BaseService');
const Transfer = require('../models/Transfer');

class TransferService extends BaseService {
    constructor() {
        super(Transfer);
    }

    async findById(transferId){
        return await this.model.findById(transferId)
        .populate({ path: 'account', populate: { path: 'bank' } })
        .populate('client');
    }

    async findAll(){
        return await this.model.find()
        .populate({ path: 'account', populate: { path: 'bank' } })
        .populate('client');
    }

    async findByStatus(status){
        return await this.model.find({ status: new RegExp(`^${status}$`, 'i') })
        .populate({ path: 'account', populate: { path: 'bank' } })
        .populate('client');
    }

    async findAllSent(){
        return await this.model.find({ amount: { $lt: 0 } })
        .populate({ path: 'account', populate: { path: 'bank' } })
        .populate('client');
    }

    async findAllReceived(){
        return await this.model.find({ amount: { $gt: 0 } })
        .populate({ path: 'account', populate: { path: 'bank' } })
        .populate('client');
    }

    async updateStatus(transferId, newStatus) {
        const transfer = await this.model.findById(transferId);
        if(!transfer) throw new Error('Transfer not found');

        transfer.status = newStatus;
        return await transfer.save();
    }
}

module.exports = new TransferService();

