import "./css/chatsection.css";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Container,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

export default function Chatsection({ user }) {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Contact 1" },
    { id: 2, name: "Contact 2" },
  ]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedContact) {
      if (!messages[selectedContact.id]) {
        fetchMessages(selectedContact.id);
      }
    }
  }, [selectedContact, messages]);

  const fetchMessages = (contactId) => {
    fetch(
      `http://localhost:3001/api/messages?userId=${user.uid}&contactId=${contactId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched messages:", data);
        setMessages((prevMessages) => ({
          ...prevMessages,
          [contactId]: data,
        }));
      })
      .catch((error) => console.error("Error fetching messages:", error));
  };

  // ...

const handleSend = () => {
  if (newMessage.trim() !== "") {
    fetch("http://localhost:3001/api/messagesRouter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newMessage,
        sender: user.displayName,
        userId: user.uid,
        contactId: selectedContact.id, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Message sent successfully:", data);
        setMessages((prevMessages) => ({
          ...prevMessages,
          [selectedContact.id]: [
            ...(prevMessages[selectedContact.id] || []),
            data,
          ],
        }));
        setNewMessage("");
      })
      .catch((error) => console.log("Error sending message:", error));
  }
};

// ...


  useEffect(() => {
    console.log("User prop has changed:", user);
  }, [user]);

  return (
    <>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="chat-section">
        <CssBaseline />
        <Drawer variant="permanent" anchor="left" className="sidebar">
          <List>
            {contacts.map((contact) => (
              <ListItem
                key={contact.id}
                button
                onClick={() => setSelectedContact(contact)}
              >
                <ListItemText primary={contact.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Container className="chat-container">
          <div className="chat-header">
            {selectedContact ? selectedContact.name : "Select a contact"}
          </div>
          <div className="chat-messages">
            {messages[selectedContact?.id]?.map((message) => (
              <div
                key={message._id}
                className={
                  message.sender === user.uid
                    ? "user-message"
                    : "contact-message"
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <TextField
              fullWidth
              variant="outlined"
              label="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </div>
        </Container>
      </div>
    </>
  );
}
Chatsection.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    
  }).isRequired,
};