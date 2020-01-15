const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/messages', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Connected to mongoose'));


module.exports = db