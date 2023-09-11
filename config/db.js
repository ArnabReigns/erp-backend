const mongoose = require('mongoose');

const databaseUrl =  "mongodb+srv://reigns:1234@cluster0.13xpwiw.mongodb.net/dev?retryWrites=true&w=majority";

mongoose.connect(databaseUrl).then(()=> console.log('Database Connected'));

const db = mongoose.connection;
module.exports = db;
