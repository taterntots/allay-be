const express = require('express'); //importing a CommonJS module
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan'); //for logging middleware
const server = express(); //creates the server
//
//global middleware
server.use(express.json()); //middleware needed to parse JSON
server.use(helmet()); //middleware that adds a layer of security to the server
server.use(cors()); //middleware that allows cross domain communication from the browser
server.use(morgan('tiny')); //logger middleware

//Auth middleware
const Auth = require('../middleware/auth-middle.js');

//Router Imports
const authRouter = require('../routers/auth-router.js');
const usersRouter = require('../routers/users-router.js');
const companiesRouter = require('../routers/companies-router.js');
const reviewsRouter = require('../routers/reviews-router.js');

//endpoints
server.get('/', (req, res) => {
  res.status(200).json({ welcome: `to the danger zone!` });
});

//routes with Auth applied
server.use('/api/auth', authRouter);
server.use('/api/users', Auth, usersRouter);
server.use('/api/organizations', Auth, companiesRouter);
server.use('/api/reviews', Auth, reviewsRouter);

module.exports = server;
