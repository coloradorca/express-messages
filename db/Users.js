//import/ require correct files
const db = require('./config')
const mongoose = require('mongoose');

//create new schema
const Schema = mongoose.Schema;

const userschema = new Schema ({
  name : String,
  age: Number,
  haircolor: String,
  hobby: String
});


//link that shema to the mongoose model
const Users = mongoose.model('Users', userschema)


module.exports = Users;