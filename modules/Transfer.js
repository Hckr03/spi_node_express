const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    accoun: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    amount:{
        type: Number,
        required: true,
        min: [0, 'Amount must be positive']
    },
    status:{
        type: String,
        enum: ['pending', 'completed', 'failed'], //de esta manera se declara una "clase enum" no como en C#
        trim: true,
        default: 'pending'
    }
},{ timestamps: true });

module.exports = mongoose.model('Transfer', transferSchema);