const router = require('express').Router();

const User = require('../helpers/users-model.js');
const Rev = require('../helpers/reviews-model.js');

/**************************************************************************/

//                  for endpoints beginning with /users                   //

/**************************************************************************/

//*************** GET ALL USERS *****************//
router.get('/current', (req, res) => {
  User.findUsers()
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

// //*************** GET USER BY FILTER *****************//
// router.get('/filter', (req, res) => {
//   console.log(req.params, 'req.params ln 23');
//   const filter = req.params.filter;

//   User.findUsersBy(filter)
//     .then(user => {
//       res.json(user);
//     })
//     .catch(err => res.send(err));
// });

//*************** GET USER BY ID *****************//
router.get('/:userId', (req, res) => {
  const id = req.params.userId;

  User.findUserById(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

//*************** UPDATE USER INFO ******************//
router.put('/:userId', (req, res) => {
  const changes = req.body;
  const id = req.params.userId;

  User.updateUser(id, changes)
    .then(info => {
      if (info) {
        res.status(200).json({ info: changes });
      } else {
        res.status(404).json({ message: 'Error locating user info' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error updating user info' });
    });
});

//****************** DELETE ACCOUNT ********************//
router.delete('/:userId', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findUserById(id);
    if (user) {
      const deleted = await User.deleteUser(id);
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Error locating user.' });
    }
  } catch {
    res
      .status(500)
      .json({ message: 'There was an error deleting your account.' });
  }
});

//***************** ADD NEW REVIEW *******************//
router.post('/:id/reviews', (req, res) => {
  let review = req.body;

  Rev.addReview(review)
    .then(newReview => {
      res.status(201).json(newReview);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'There was an error' });
    });
});

/**************************************************************************/

module.exports = router;
