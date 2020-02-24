const db = require('../data/dbConfig.js');

module.exports = {
	findUsers,
	findUsersBy,
	findUserById,
	findUserReviews,
	addUser,
	updateUser,
	deleteUser
};

//Create some functions!

function findUsers() {
	return db('users');
}

function findUsersBy(filter) {
	return db('users').where(filter);
}

function findUserById(userId) {
	return db('users as u')
		.where('id', userId)
		.select('u.id', 'u.username', 'u.email')
		.first()
		.then(user => {
			return findUserReviews(user.id).then(userReviews => {
				return {
					...user,
					reviews: userReviews
				};
			});
		});
}

function findUserReviews(userId) {
	return db('reviews as r').where('r.user_id', userId);
}

function addUser(user) {
	return db('users')
		.insert(user, 'id')
		.then(([id]) => {
			return findUsersBy({ id });
		});
}

function updateUser(id, changes) {
	return db('users')
		.where({ id })
		.update(changes)
		.then(count => (count > 0 ? findUsersBy({ id }) : null));
}

function deleteUser(id) {
	return db('users')
		.where({ id })
		.del();
}

////// Refactored
// function findUserById(userId) {
// 	return db('reviews as r')
// 		.where('r.user_id', userId)
// 		.join('users as u', 'r.user_id', 'u.id')
// 		.select('u.id', 'u.username')
// 		.then(result => {
// 			// console.log(result[0].id);
// 			return findUserReviews(result[0].id) //Having an error with this line when registering new user. Does this matter?
// 				.then(reviewArray => {
// 					// console.log(reviewArray)
// 					return { ...result[0], reviews: reviewArray };
// 				})
// 				.catch(err => console.log(err));
// 		})
// 		.catch(err => console.log(err));
// }
