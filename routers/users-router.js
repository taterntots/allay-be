const router = require('express').Router();

const User = require('../helpers/users-model.js');
const Rev = require('../helpers/reviews-model.js');
const {
  checkForReviewData,
  validateUserId
} = require('../middleware/index.js');

/**************************************************************************/

//                  for endpoints beginning with /users                   //

/**************************************************************************/

//*************** GET ALL USERS *****************// - Remove for production or create new auth for admin only access to this endpoint
router.get('/all', (req, res) => {
  User.findUsers()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ error: 'There was an error' });
    });
});

//*************** GET USER BY ID *****************//
router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  User.findUserById(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ error: 'There was an error getting user' });
    });
});

//*************** UPDATE USER INFO ******************//
router.put('/:id', validateUserId, (req, res) => {
  const { email, password, username } = req.body;
  const { id } = req.params;
  User.findUsersBy({ id }).then(userInfo => {
    const user = userInfo;
    if (
      email === user[0].email &&
      username === user[0].username &&
      password === user[0].password
    ) {
      return res.status(200).json({ message: 'No changes to update' });
    } else {
      User.updateUser(id, { email, password, username })
        .then(info => {
          if (info) {
            res.status(202).json({ info: { email, password, username } });
          } else {
            res.status(404).json({ message: 'Error locating user info' });
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Error updating user info' });
        });
    }
  });
});

//****************** DELETE ACCOUNT ********************//
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findUserById(id);
    if (user) {
      const deleted = await User.deleteUser(id);
      res.status(200).json({ message: 'User account deleted' });
    } else {
      res.status(404).json({ message: 'Error locating user.' });
    }
  } catch {
    res.status(500).json({
      message: 'There was an error deleting this account.'
    });
  }
});

//***************** ADD NEW REVIEW *******************//
router.post('/:id/reviews', checkForReviewData, validateUserId, (req, res) => {
  const id = req.params.id;
  let review = req.body;
  review = { ...review, user_id: id };

  Rev.addReview(review)
    .then(newReview => {
      if (newReview && Number(req.user.id) === Number(id)) {
        res.status(201).json(newReview);
      } else {
        res.status(404).json({ message: 'Could not create review' });
      }
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ error: 'There was an error' });
    });
});

//************* GET ALL REVIEWS FOR USER ID ***************//
router.get('/:id/reviews', validateUserId, (req, res) => {
  let { id } = req.params;
  User.findUserReviews(id)
    .then(reviews => {
      if (reviews.length > 0) {
        res.status(200).json(reviews);
      } else {
        res.status(404).json({ error: 'User has not posted any reviews' });
      }
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ error: 'Failed to get reviews' });
    });
});
/**************************************************************************/

module.exports = router;
