

const express =require("express");
const mongoose= require("mongoose");
const cors=require('cors');

const app= express();

const PORT= 3001;

app.use(cors());

mongoose.connect('mongodb://localhost:27017/chatcollection', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('Connected to MongoDB');
});


const Message=require('./models/Message');
const messageRoutes=require('./routes/messageRoutes');

app.use(express.json());
app.use('/api/messagesRouter',messageRoutes);
app.get('/api/messages', async (req, res) => {
  try {
    const userId = req.query.userId; 
    const messages = await Message.find({ userId: userId }); 
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
});
