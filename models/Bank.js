const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    bankCode: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    address: { 
        type: String, 
        trim: true 
    },
    accounts: [
        { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account' 
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Bank', bankSchema);