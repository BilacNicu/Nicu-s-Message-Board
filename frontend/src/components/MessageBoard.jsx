import { React, useState, useEffect, useContext } from 'react';
import "../styles/MessageBoard.css";
import { useNavigate } from 'react-router';
import { AuthContext } from '../components/AuthContext.jsx';

function MessageBoard() {

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const { logout, username } = useContext(AuthContext);

    useEffect(() => {
        fetch('/messages')
          .then(response => response.json())
          .then(data => setMessages(data))
          .catch(error => console.error("There was an error fetching messages:", error));
      }, []);

      const handleLogout = async (e) => {
        e.preventDefault();
        logout();
      
    };

      const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
          text: currentMessage,
          username: username,
          added: new Date()
        };
      
        fetch('/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        })
        .then(response => response.json())
        .then(data => {
          setMessages(prevMessages => [...prevMessages, data]);
          setCurrentMessage(''); // Reset the message input field
        })
        .catch((error) => {
          console.error('Error posting message:', error);
        });
      };


return (
    <div className='mainDiv'>
      <h2 className='titleHeader'>Nicu's Message Board</h2>
      <div className='messageBoard'>
        <ul>
        {messages.map((message, index) => (
            <li key={index}>
              <p>{message.text} by <span className="bold">{message.username}</span> on {new Date(message.added).toLocaleString()}</p>
            </li>
          ))}
        </ul>
        <form className='inputForm' onSubmit={handleSubmit}>
          {/* Removed the username input field */}
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Write a message..."
            required
            className='usernameInput'
          />
          <button type="submit" id="post"className='submitBtn'>Post Message</button>
        </form>
        <button onClick={handleLogout} className='submitBtn'>Logout</button>
      </div>
    </div>
  );
};

export default MessageBoard;

    
