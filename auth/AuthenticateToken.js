const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = "secret";

function authenticateToken(req, res, next) {
  // Try to retrieve the token from the "Authorization" header or cookies
  const token =
    req.cookies.token ||
    req.headers['authorization']?.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // No token provided
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Invalid token
      
    }
    req.user = user; // Add the user payload to the request object
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = authenticateToken;
