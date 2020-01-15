//Message Model
const db = require('./config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema ({
  name: String,
  message: String
});

const Message = mongoose.model('Message', messageSchema);

const createMessage = async (message) => {
  const newMessage = new Message (message);
    await newMessage.save();
    return true;
};

const findMessage = (message) => {
	return Message.find({ _id : message })
		.then(results => results);
};

module.exports = {
  Message,
  createMessage,
  findMessage
}
