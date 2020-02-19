const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../helpers/users-model.js");

const { jwtSecret } = require("../config/secret.js");

/**************************************************************************/

//               for endpoints beginnings with /api/auth                  //

/*************************** BEGIN REGISTER *******************************/

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 3); //Change in production!!!

  user.password = hash;

  User.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error" });
    });
});
/*************************** END REGISTER *******************************/

/*************************** BEGIN LOGIN *******************************/

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  User.findUser(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error" });
    });
});

/*************************** END LOGIN *******************************/

/************************* BEGIN CREATE TOKEN *****************************/

//Create TOKEN
function signToken(user) {
  const payload = {
    id: user.id,
    email: user.username
  };

  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

/************************* END CREATE TOKEN *****************************/

module.exports = router;
