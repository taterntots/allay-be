const router = require('express').Router();

const User = require('../helpers/users-model.js');
const Rev = require('../helpers/reviews-model.js');
const IRevs = require('../helpers/interview-reviews-model');
const CRevs = require('../helpers/company-reviews-model.js');
const {
  checkForReviewData,
  validateUserId
} = require('../middleware/index.js');

/**************************************************************************/

//                  for users endpoints beginning with /users                   //

/**************************************************************************/

//*************** GET ALL USERS *****************// - Remove for production or create new auth for admin only access to this endpoint
router.get('/all', (req, res) => {
  User.findUsers()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error getting all users to dsiplay'
      });
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
      res.status(500).json(err, { error: 'There was an error getting user' });
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

/**************************************************************************/

//        for company interview endpoints beginning with /users/:id                   //

/**************************************************************************/

//***************** GET USERS COMPANY REVIEWS *******************//

router.get('/:userId/company-reviews', validateUserId, (req, res) => {
  const { userId } = req.params;

  User.findUserCompanyReviews(userId)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(err, {
        error: 'There was an error getting user company reviews.'
      });
    });
});

//***************** GET USERS SINGLE COMPANY REVIEW BY ID*******************//
router.get(
  '/:userId/company-review/:revId',
  // validateUserId,
  (req, res) => {
    const { userId, revId } = req.params;
    console.log('.get id', { userId, revId });

    User.findUserCompanyReviewById(revId)
      .then(userReview => {
        res.status(200).json(userReview);
      })
      .catch(err => {
        res.status(500).json(err, {
          error: 'There was an error getting a single user company review'
        });
      });
  }
);

//***************** ADD NEW COMPANY REVIEW *******************// ===== make sure to update the if else statement====
router.post(
  '/:id/add-company-review',
  //  checkForReviewData,
  validateUserId,
  (req, res) => {
    const { id } = req.params;
    console.log(req.user);
    let companyReview = req.body;
    companyReview = { ...companyReview, user_id: id };

    // if (Number(req.user.id) === Number(id)) {
    CRevs.addCompanyReview(companyReview)
      .then(newReview => {
        res.status(201).json(newReview);
      })
      .catch(err => {
        res
          .status(500)
          .json(err, { error: 'There was an error check id or review fields' });
      });
    //   } else {
    //     return res.status(404).json({ error: 'Wrong user' });
    //   }
  }
);
//************* EDIT A COMPANY REVIEW WITH USER ID ***************//

router.put('/:id/company-reviews/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  const changes = req.body;

  CRevs.updateCompanyReview(id, changes)
    .then(updatedReview => {
      if (updatedReview) {
        res.status(200).json({ updatedReview: changes });
      } else {
        res.status(404).json(err, {
          error: 'could not find a valid company review'
        });
      }
    })
    .catch(err => {
      res.status(500).json(err, { error: 'can not edit company review' });
    });
});

//************* DELETE A COMPANY REVIEW BY USER ID ***************//

router.delete('/:id/company-reviews/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  CRevs.deleteCompanyReview(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json(err, {
        error: ' was not able to delete company review'
      });
    });
});

/**************************************************************************/

//           for interview review endpoints beginning with /users/:id                   //

/**************************************************************************/

//***************** GET USERS INTERVIEW REVIEWS *******************//

router.get('/:id/interview-reviews', validateUserId, (req, res) => {
  const { id } = req.params;

  User.findUserInterviewReviews(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err, {
        error: 'There was an error getting user interview reviews'
      });
    });
});

//************* GET A SINGLE REVIEW BY USER ID ***************//

router.get('/:id/interview-review/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  User.findUserInterviewReviewById(id)
    .then(userReview => {
      res.status(200).json(userReview);
    })
    .catch(err => {
      res.status(500).json(err, {
        error: 'There was an error getting a single user interview review'
      });
    });
});

//***************** ADD NEW INTERVIEW REVIEW *******************// ===== make sure to update the if else statement====
router.post(
  '/:id/add-interview-review',
  //  checkForReviewData,
  validateUserId,
  (req, res) => {
    const { id } = req.params;
    console.log(req.user);
    let interviewReview = req.body;
    interviewReview = { ...interviewReview, user_id: id };

    // if (Number(req.user.id) === Number(id)) {
    IRevs.addInterviewReview(interviewReview)
      .then(newReview => {
        res.status(201).json(newReview);
      })
      .catch(err => {
        res
          .status(500)
          .json(err, { error: 'There was an error check id or review fields' });
      });
    //   } else {
    //     return res.status(404).json({ error: 'Wrong user' });
    //   }
  }
);

//************* EDIT A INTERVIEW REVIEW WITH USER ID ***************//

router.put('/:id/interview-reviews/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  const changes = req.body;

  IRevs.updateInterviewReview(id, changes)
    .then(updatedReview => {
      if (updatedReview) {
        res.status(200).json({ updatedReview: changes });
      } else {
        res.status(404).json(err, {
          error: 'could not find a valid interview review'
        });
      }
    })
    .catch(err => {
      res.status(500).json(err, { error: 'can not edit interview review' });
    });
});

//************* DELETE A COMPANY REVIEW BY USER ID ***************//

router.delete('/:userId/interview-reviews/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  IRevs.deleteInterviewReview(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json(err, {
        error: ' was not able to delete interview review'
      });
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
      res.status(500).json({ error: 'Failed to get reviews' });
    });
});
/**************************************************************************/

module.exports = router;
