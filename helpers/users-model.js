const db = require('../data/dbConfig.js');

module.exports = {
  findUsers,
  findUsersBy,
  findUserById,
  findUserCompanyReviews,
  addUser,
  updateUser,
  deleteUser
};

// FIND ALL USERS
function findUsers() {
  return db('users');
}

// FIND USERS BY A SPECIFIC FILTER (MUST BE A COLUMN IN THE USERS TABLE AND USE {<ARGUMENT>})
function findUsersBy(filter) {
  return db('users').where(filter);
}

// FIND USER BY ID, WILL CONTAIN ANY REVIEWS ASSOCIATED WITH THE USER OR AN EMPTY ARRAY
function findUserById(userId) {
  return db('users as u')
    .where('id', userId)
    .select('u.id', 'u.username', 'u.email', 'u.track_id')
    .first()
    .then(user => {
      return findUserCompanyReviews(user.id).then(userReviews => {
        return {
          ...user,
          company_reviews: userReviews
        };
      });
    });
}

// FIND ONLY THE COMPANY REVIEWS ASSOCIATED WITH A USER

function findUserCompanyReviews(userId) {
  return db('company_reviews as cr')
    .select(
      'cr.id as company_review_id',
      'cr.job_title',
      'cr.start_date',
      'cr.end_date',
      'cr.comment',
      'cr.typical_hours',
      'cr.salary',
      'cr.job_rating',
      'u.username as username',
      'c.company_name',
      'c.domain as logo',
      'ws.work_status ',
      'cr.created_at',
      'cr.updated_at'
    )
    .where('cr.user_id', userId)
    .join('users as u', 'cr.user_id', 'u.id')
    .join('companies as c', 'cr.company_id', 'c.id')
    .join('work_status as ws', 'cr.work_status_id', 'ws.id');
}

// ADD A USER TO THE DATABASE
function addUser(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => {
      return findUserById(id);
    });
}

// UPDATE AN EXISTING USER
function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findUserById(id) : null));
}

// DELETE AN EXISTING USER
function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}
