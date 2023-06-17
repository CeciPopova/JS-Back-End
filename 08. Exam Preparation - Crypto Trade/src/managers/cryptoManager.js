const Crypto = require('../models/Crypto');

exports.create = (ownerId, cryptoData) => Crypto.create({...cryptoData, owner: ownerId});

exports.getAll  = () => Crypto.find();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);

exports.buy = async (userId, cryptoId) => {
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyers.push(userId);
   
    return crypto.save();
}

exports.getByOwner = (userId) => Crypto.find({owner: userId});

exports.search = async (name, paymentMethod) => {
    let crypto = await this.getAll().lean();

    if (name) {
        crypto = crypto.filter(x => x.name.toLowerCase() == name.toLowerCase());
    }

    if (paymentMethod) {
        crypto = crypto.filter(x => x.payment == paymentMethod);
    }

    return crypto;
}