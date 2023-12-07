const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text, sender, userId, contactId } = req.body;
    console.log("Received message:", { text, sender, userId, contactId });

    const message = new Message({ text, sender, userId, contactId });

    // Log the message before saving
    console.log("Saving message:", message);

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.log("Error saving message:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId, contactId } = req.query;
    const messages = await Message.find({ userId, contactId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
