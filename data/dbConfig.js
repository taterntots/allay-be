// for configuring knex and our database
// require('dotenv').config();

// const knex = require('knex');
// const config = require('../knexfile');

// const dbEnv = process.env.DB_ENV || 'development';

// module.exports = knex(config[dbEnv]);

const knex = require('knex');
const knexfile = require('../knexfile');

const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

module.exports = knex(configOptions);
