const clientService = require('../services/clientService');

class ClientController {
    
    async createClient(req, res){
        try{
            const client = req.body;

            const existingClient = await clientService.findByDocNum(client.docNum);
            if(existingClient) return res.status(400).json({
                message: `This cliente ${client.docNum} already exists!`
            });

            await clientService.create(client);
            return res.status(201).json({ message: "Client created succesfully"});
        }catch(error){
            return res.status(500).json({ message: "Client not created", error: error.message});
        }
    }

    async findAll(req, res){
        try{
            const clients = await clientService.findAll();
            return res.status(200).json(clients);
        }catch(error){
            return res.status(500).json({ message: "Error retrieving banks", error: error.message});
        }
    }

    async findById(req, res){
        try {
            const { docNum } = req.params;
            const client = await clientService.findByDocNum(docNum);

            if(client) return res.status(404).json({
                message: `The client with ID = ${client.docNum} does not exist!`
            });

            return res.status(200).json(client);
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving client",
                error: error.message
            });
        }
    }

    async update(req, res){
        try {
            const { docNum } = req.params;
            const client = req.body;

            if(docNum !== client.docNum) return res.status(400).json({
                message: "Bank code in URL and body do not match"
            });

            const clientToUpdate = await clientService.findByDocNum(docNum);
            if(!clientToUpdate) return res.status(404).json({
                message: `Client with ID = ${client.docNum} does not exists!`
            });

            await clientService.updateClient(docNum, client);
            return res.status(204).json.send();

        } catch (error) {
            return res.status(500).json({
                message: "Error updating client",
                error: error.message
            });
        }
    }

    async deleteClient(req, res){
        try {
            const { docNum } = req.params;
            const clientToDelete = await clientService.findByDocNum(docNum);

            if(!clientToDelete) return res.status(404).json({
                message: `Cliente with the ID = ${docNum} does not exist!`
            });

            await clientService.delete(clientToDelete._id);
            return res.status(200).json({
                message: "Client deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error deleting client",
                error: error.message
            });
        }
    }
}

module.exports = new ClientController();