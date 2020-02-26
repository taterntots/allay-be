const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret.js');
const Users = require('../helpers/users-model.js');
const Companies = require('../helpers/companies-model.js');
const Reviews = require('../helpers/reviews-model.js');

module.exports = {
  restricted,
  checkForRegisterData,
  checkForLoginData,
  checkForCompanyData,
  checkForReviewData,
  validateUserId,
  validateCompanyId,
  validateReviewId
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

function checkForCompanyData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ errorMessage: 'body is empty / missing review data' });
  } else if (!req.body.name) {
    res.status(400).json({ errorMessage: 'company name is required' });
  } else {
    next();
  }
}

function checkForReviewData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ errorMessage: 'body is empty / missing review data' });
  } else if (!req.body.job_title || !req.body.job_location || !req.body.salary || !req.body.company_id) {
    res.status(400).json({ errorMessage: 'job title, job location, salary, and company id are required' });
  } else {
    next();
  }
}

function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.findUserById(id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(400).json({ errorMessage: 'The user with the specified ID does not exist' });
      }
    })
    .catch(erorr => {
      res.status(500).json({ errorMessage: 'Could not validate user information for the specified ID' });
    })
}

function validateCompanyId(req, res, next) {
  const id = req.params.id;
  Companies.findCompanyById(id)
    .then(company => {
      if (company) {
        next();
      } else {
        res.status(400).json({ errorMessage: 'The company with the specified ID does not exist' });
      }
    })
    .catch(erorr => {
      res.status(500).json({ errorMessage: 'Could not validate company information for the specified ID' });
    })
}

function validateReviewId(req, res, next) {
  const id = req.params.id;
  Reviews.findReviewById(id)
    .then(review => {
      if (review) {
        next();
      } else {
        res.status(400).json({ errorMessage: 'The review with the specified ID does not exist' });
      }
    })
    .catch(erorr => {
      res.status(500).json({ errorMessage: 'Could not validate review information for the specified ID' });
    })
}