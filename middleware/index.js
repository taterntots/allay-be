const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secret.js");

module.exports = {
  checkForRegisterData,
  checkForLoginData,
  restricted
}

function checkForRegisterData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ errorMessage: 'body is empty / missing registration data' });
  } else if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400).json({ errorMessage: 'username, password, and email fields are required' });
  } else {
    next();
  }
}

function checkForLoginData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ errorMessage: 'body is empty / missing registration data' });
  } else if (!req.body.username || !req.body.password) {
    res.status(400).json({ errorMessage: 'username and password fields are required' });
  } else {
    next();
  }
}

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        //i.e: the token is not valid
        res.status(401).json({ message: "The token is missing or invalid" });
      } else {
        req.user = { id: decodedToken.id, email: decodedToken.email };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Must be an authorized user" });
  }
}