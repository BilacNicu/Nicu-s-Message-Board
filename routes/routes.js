var express = require('express');
var router = express.Router();
const Message = require('../models/message.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const authenticateToken = require("../auth/AuthenticateToken.js");
require('dotenv').config();
const secret = "secret";

  router.post('/messages', authenticateToken, async (req, res) => {
    console.log("Messages post called");
  
    const username = req.user.username;

    const message = new Message({
      text: req.body.text,
      username: username
    });
    await message.save();
    res.send(message);
  });

  router.get('/messages', async (req, res) => {
    console.log("Messages get called");
    const messages = await Message.find().sort({ added: 1 }); 
    res.send(messages);
  });
  

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully', user: { username: user.username } });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send(error.message);
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { username: user.username }, // This is the payload, which includes the user information.
        secret, // The secret key used to sign the token. Ensure you have this in your environment variables.
        { expiresIn: '2h' } // Set the token to expire in 2 hour. You can adjust the expiration as needed.
      );
  
      // Send the token in an HTTP-only cookie
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
      // Optionally send a success message or user data (excluding sensitive information)
      res.status(200).json({ message: 'Login successful', user: { username: user.username } });

    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.get('/validate-session', authenticateToken, (req, res) => {
    // If the token is valid, the authenticateToken middleware would allow this route
    console.log("Token received in /validate-session:", req.cookies['token']);
    
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ message: 'Session is valid' });
  });

  router.post('/logout', (req, res) => {
    // Clear the cookie named 'token' (adjust the name as needed)
    res.clearCookie('token', {
      httpOnly: true,
      // Include other cookie attributes here as necessary, such as 'sameSite' and 'secure'
    });
    res.sendStatus(200); // Send back a successful response
  });
  

module.exports = router;
