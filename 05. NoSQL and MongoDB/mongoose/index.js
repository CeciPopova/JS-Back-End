const mongoose = require('mongoose');
const Cat = require('./models/Cat');

 async function connectDb() {
    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');
    console.log('Successfully connected!');

    const cats = await Cat.find({ breed: 'Angora'});

    cats.forEach(cat => cat.greet());
    console.log(cats);
}

connectDb();