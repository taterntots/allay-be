const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secret.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        //i.e: the token is not valid
        res.status(401).json({ message: "Token error" });
      } else {
        req.user = { id: decodedToken.id, email: decodedToken.email };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Must be an authorized user" });
  }
};
