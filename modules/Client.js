const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    docNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    docType: {
        type: String,
        trim: true,
    },
    fullName: {
        type: String,
        trim: true
    },
    account: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }],
    transfer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transfer'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);