const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getAll  = () => Crypto.find();//.populate('owner');

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);//.populate('owner');

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);

// exports.addComment = async (photoId, commentData) => {
//     const photo = await Crypto.findById(photoId);

//     photo.comments.push(commentData);

//     return photo.save();
// }

exports.getByOwner = (userId) => Crypto.find({owner: userId});