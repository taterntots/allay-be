const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret.js');
const Users = require('../helpers/users-model.js');
const Reviews = require('../helpers/reviews-model.js');
const Companies = require('../helpers/companies-model.js');
const CRevs = require('../helpers/company-reviews-model.js');
const IRevs = require('../helpers/interview-reviews-model.js');

module.exports = {
  restricted,
  checkForRegisterData,
  checkForLoginData,
  validateUserId,
  checkForCompanyData,
  validateCompanyId,
  checkForCompanyReviewData,
  validateCompanyReviewId,
  checkForInterviewReviewData,
  validateInterviewReviewId,
  checkForReviewData,
  validateReviewId
};

// Auth Router

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        //i.e: the token is not valid
        res
          .status(401)
          .json({ errorMessage: 'The provided token is invalid / expired' });
      } else {
        req.user = { id: decodedToken.id, email: decodedToken.email };
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ errorMessage: 'Must be an authorized user / token is missing' });
  }
}

function checkForRegisterData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ errorMessage: 'body is empty / missing registration data' });
  } else if (
    !req.body.username ||
    !req.body.password ||
    !req.body.email ||
    !req.body.track_id
  ) {
    res.status(400).json({
      errorMessage: 'username, password, email, and track fields are required'
    });
  } else {
    next();
  }
}

function checkForLoginData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json(err, { errorMessage: 'body is empty / missing registration data' });
  } else if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json({ errorMessage: 'username and password fields are required' });
  } else {
    next();
  }
}

// Users Router

function validateUserId(req, res, next) {
  let { userId } = req.params;
  id = userId;

  Users.findUsersBy({ id })
    .then(user => {
      if (user.length > 0) {
        next();
      } else {
        res.status(404).json({
          errorMessage: 'The user with the specified ID does not exist.'
        });
      }
    })
    .catch(error => {
      res.status(500).json(error, {
        errorMessage:
          'Could not validate user information for the specified ID.'
      });
    });
}

// Companies Router

function checkForCompanyData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ errorMessage: 'body is empty / missing company data' });
  } else if (!req.body.company_name || !req.body.state_id) {
    res
      .status(400)
      .json({ errorMessage: 'company name and state id is required' });
  } else {
    next();
  }
}

function validateCompanyId(req, res, next) {
  const id = req.params.id;
  Companies.findCompaniesBy({ id })
    .then(company => {
      if (company.length > 0) {
        next();
      } else {
        res.status(404).json({
          errorMessage: 'The company with the specified ID does not exist'
        });
      }
    })
    .catch(erorr => {
      res.status(500).json({
        errorMessage:
          'Could not validate company information for the specified ID'
      });
    });
}

// Company Reviews Router

function checkForCompanyReviewData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ errorMessage: 'body is empty / missing review data' });
  } else if (
    !req.body.job_title ||
    !req.body.start_date ||
    !req.body.end_date ||
    !req.body.salary ||
    !req.body.typical_hours ||
    !req.body.work_status_id ||
    !req.body.company_id
  ) {
    res.status(400).json({
      errorMessage:
        'job title, job location, salary, and company id are required'
    });
  } else {
    next();
  }
}

function validateCompanyReviewId(req, res, next) {}

// Interview Reviews Router

function checkForInterviewReviewData(req, res, next) {}

function validateInterviewReviewId(req, res, next) {}

function checkForReviewData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ errorMessage: 'body is empty / missing review data' });
  } else if (
    !req.body.job_title ||
    !req.body.job_location ||
    !req.body.salary ||
    !req.body.company_id
  ) {
    res.status(400).json({
      errorMessage:
        'job title, job location, salary, and company id are required'
    });
  } else {
    next();
  }
}

function validateReviewId(req, res, next) {
  const id = req.params.id;
  Reviews.findReviewById(id)
    .then(review => {
      if (review) {
        next();
      } else {
        res.status(404).json({
          errorMessage: 'The review with the specified ID does not exist'
        });
      }
    })
    .catch(erorr => {
      res.status(500).json({
        errorMessage:
          'Could not validate review information for the specified ID'
      });
    });
}
