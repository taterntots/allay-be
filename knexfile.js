// Update with your config settings.
require('dotenv').config();

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/allay.db3'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		},
		// SQLite will not enforce foreign key constraints by default
		// ONLY NEEDED FOR SQLITE
		pool: {
			afterCreate: (conn, done) => {
				conn.run('PRAGMA foreign_keys = ON', done); // tur on foreign key enforcement
			}
		}
	},

	testing: {
		client: 'sqlite3',
		connection: {
			filename: './data/test.db3'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	},

	staging: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		},
		pool: {
			min: 2,
			max: 10
		}
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './data/migrations'
		}
	}
};
