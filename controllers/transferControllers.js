const transferService = require('../services/transferService');
const accountService = require('../services/accountService');
const clientService = require('../services/clientService')

class TransferController{

    async createTransfer(req, res){
        try{
            const transfer = req.body;

            if(await this.existsAccounts(transfer)) return res.status(400).json({
                message: "Account does not exist!"
            });

            if(this.transferNullOrEmpty(transfer)) return res.status(400).json({
                message: "The account has no money in it"
            });

            if(await this.equalBanks(transfer)) return res.status(400).json({
                message: "Banks must be differents to do this operation."
            });

            if(await this.balance(transfer)) return res.status(400).json({
                message: "The account has no money in it"
            });

            await this.makeTransfer(transfer)
            return res.status(201).json({
                message: "Transfer completed succesfully"
            })
        }catch(error){
            return res.status(500).json({
                message: "Error with transfer",
                error: error.message
            });
        }
    }

    async findAll(req, res){
        try {
            const transferService = await transferService.findAll();
            return res.status(200).json(transfers);
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving transfers"
            });
        }
    }

    async findAllByStatus(req, res){
        try {
            const { status } = req.params;
            const transfers = await transferService.findByStatus(status);
            return res.status(200).json(transfers);
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving transfers",
                error: error.message
            });
        }
    }

    async findAllSent(req, res) {
        try {
            const transfers = await transferService.findAllSent();
            return res.status(200).json(transfers);
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving transfers",
                error: error.message });
        }
    }

    async findAllReceived(req, res){
        try {
            const transfers = await transferService.findAllReceived();
            return res.status(200).json(transfers);
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving transfers",
                error: error.message
            });
        }
    }

    async updateStatus(req, res){
        try {
            const { id } = req.params;
            const { status } = req.body;

            const transfer = await transferService.findById(id);
            if(!transfer) return res.status(400).json({
                message: `Transfer with the ID = ${id} does not exists!`
            })

            await transferService.updateStatus(id, status);
            return res.status(200).json({
                message: "Status updated successfully"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Error updating status",
                error: error.message
            });
        }
    }

    async deleteTransfer(req, res){
        try {
            const { id } = req.params;
            const transfer = await transferService.findById(id);
            if(!transfer) return res.status(404).json({
                message: `Transfer with ID = ${id} does not exist!`
            })

            await transferService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: "Error deleting transfer",
                error: error.message
            });
        }
    }

    async existsAccounts(transfer){
        const fromAccount = await accountService.findByAccountNumber(transfer.fromAccount);
        const toAccount = await accountService.findByAccountNumber(transfer.toAccount);
        return !fromAccount || !toAccount;
    }

    transferNullOrEmpty(transfer){
        return !transfer || Object.keys(transfer).length === 0;
    }

    async equalBanks(transfer){
        const fromAccount = await accountService.findByAccountNumber(transfer.fromAccount);
        const toAccount = await accountService.findByAccountNumber(transfer.toAccount); 

        if(fromAccount && toAccount){
            return fromAccount.bank.toString() === toAccount.bank.toString();
        }

        return false;
    }

    async makeTransfer(transfer){
        const fromAccount = await accountService.findByAccountNumber(transfer.fromAccount);
        const fromClient = await clientService.findByDocNum(transfer.fromClientDocNumber);

        const toAccount = await accountService.findByAccountNumber(transfer.fromAccount);
        const toClient = await accountService.findByDocNum(transfer.toClientDocNumber);

        if(!fromAccount || !fromClient || !toAccount || !toClient)
            throw new Error("One or two objetcs are required and not they're not found");

        await transferService.create({
            account: fromAccount._id,
            client: fromClient._id,
            date: new Date(),
            amout: -Math.abs(transfer.amount),
            status: transfer.status
        });
        await accountService.subtractBalance(fromAccount, transfer.amount);

        await transferService.create({
            account: toAccount._id,
            client: toClient._id,
            date: new Date(),
            amout: Math.abs(transfer.amount),
            status: transfer.status
        });
        await accountService.addBalance(toAccount, transfer.amount);
    }
}

module.exports = new TransferController();