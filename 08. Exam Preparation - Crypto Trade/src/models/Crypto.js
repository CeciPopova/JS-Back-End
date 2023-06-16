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
        match: [/^https?:\/\//, 'Invalid URL']
    },
    price: {
        type: Number,
        required: [true, 'Age is required!'],
        min: 1,
        max: 100,
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: 5,
        maxLength: 50,
    },
    payment: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: 5,
        maxLength: 50,
    },
    // owner: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    // },
    // buy: {
    //     type: [],
    //     ref: 'User',

    // },
   
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
