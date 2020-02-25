const router = require('express').Router();

const User = require('../helpers/users-model.js');
const Rev = require('../helpers/reviews-model.js');

/**************************************************************************/

//                  for endpoints beginning with /users                   //

/**************************************************************************/

//*************** GET ALL USERS *****************// - Remove for production or create new auth for admin only access to this endpoint
router.get('/all', (req, res) => {
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
router.get('/:id', (req, res) => {
  const { id } = req.params;

  User.findUsersBy({ id })
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

//*************** UPDATE USER INFO ******************//
// router.put('/:id', (req, res) => {
//   const changes = req.body;
//   const id = req.params.userId;

//   User.updateUser(id, changes)
//     .then(info => {
//       if (info) {
//         res.status(200).json({ info: changes });
//       } else {
//         res.status(404).json({ message: 'Error locating user info' });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: 'Error updating user info' });
//     });
// });

//****************** DELETE ACCOUNT ********************//
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findUserById(id);
//     if (user) {
//       const deleted = await User.deleteUser(id);
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: 'Error locating user.' });
//     }
//   } catch {
//     res
//       .status(500)
//       .json({ message: 'There was an error deleting your account.' });
//   }
// });

//***************** ADD NEW REVIEW *******************//
router.post('/:id/reviews', (req, res) => {
  const id = req.params.id;
  let review = req.body;
  review = { ...review, user_id: id };

  Rev.addReview(review)
    .then(newReview => {
      res.status(201).json(newReview);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'There was an error' });
    });
});

//************* GET ALL REVIEWS FOR USER ID ***************//
// router.post('/:id/reviews', (req, res) => {
//   let user = req.params.id;

//   Rev.findReviewsBy(user)
//     .then(user => {
//       res.json(user);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: 'There was an error' });
//     });
// });

/**************************************************************************/

module.exports = router;
