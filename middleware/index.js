module.exports = {
  checkForRegisterData,
  checkForLoginData
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