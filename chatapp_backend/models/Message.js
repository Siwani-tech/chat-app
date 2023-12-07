const mongoose = require("mongoose");

const msgschema = new mongoose.Schema({
  text: String,
  sender: String,
  userId: String,
  contactId: Number, 
});

const Message = mongoose.model("Message", msgschema);

module.exports = Message;
