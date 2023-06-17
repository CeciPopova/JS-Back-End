const mongoose = require('mongoose');


const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters!'],
    },
    image: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: 0,
        
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: 10,
       
    },
    payment: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: [true, 'Payment is required!'],
        
    },
     owner: {
         type: mongoose.Types.ObjectId,
         ref: 'User',
    },
    buyers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ]
   
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
