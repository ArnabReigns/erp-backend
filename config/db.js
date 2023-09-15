const mongoose = require('mongoose');

// const databaseUrl = "mongodb+srv://reigns:1234@cluster0.13xpwiw.mongodb.net/dev?retryWrites=true&w=majority";
const databaseUrl = "mongodb://reigns:reigns@localhost:27017/erpdev";

mongoose.connect(databaseUrl).then(() => console.log('Database Connected')).catch(err => console.log(err))

const db = mongoose.connection;
module.exports = db;
