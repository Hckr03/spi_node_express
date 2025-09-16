const BaseService = require('./BaseService');
const Client = require('../models/Client');

class ClientService extends BaseService {
    constructor() {
        super(Client);
    }

    async findByDocNum(docNum){
        return await this.model.findOne({ docNum });
    }

    async updateClient(docNum, newData) {
        const client = await this.model.findByDocNum(docNum);
        if(!client) throw new Error('Client not found');

        client.docNum = newData.docNum;
        client.docType = newData.docType;
        client.fullName = newData.fullName;

        return await client.save();
    }
}

module.exports = new ClientService();