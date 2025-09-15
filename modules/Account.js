const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountNumber: { 
        type: String,
        required: true,
        unique: true,
        trim: true
     },
    currency: {
        type: String,
        required: true,
        trim: true
     },
    balance: { 
        type: Number, 
        default: 0,
        min: [0, 'Balance cannot be negative']
    },
    client: { //de esta manera se hace referencia a otro schema o model
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client', 
        required: true 
    },
    bank: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Bank', 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);