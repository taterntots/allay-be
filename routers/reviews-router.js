const router = require('express').Router();

const Rev = require('../helpers/reviews-model.js');
const { validateReviewId } = require('../middleware/index.js');

/**************************************************************************/

//                for endpoints beginning with /reviews                   //

/**************************************************************************/

//************** GET ALL REVIEWS ****************//
router.get('/', (req, res) => {
  Rev.findReviews()
    .then(review => {
      res.json(review);
    })
    .catch(err => res.send(err));
});

//*************** GET REVIEWS BY FILTER *****************//
router.get('/filter', (req, res) => {
  const filter = req.params.filter;

  Rev.findReviewsBy(filter)
    .then(company => {
      res.json(company);
    })
    .catch(err => res.send(err));
});

//*************** GET REVIEW BY ID *****************//
router.get('/:id', validateReviewId, (req, res) => {
  const { id } = req.params;

  Rev.findReviewById(id)
    .then(company => {
      res.json(company);
    })
    .catch(err => res.send(err));
});

//***************** ADD NEW REVIEW *******************//

// This is done in the users_router
router.post('/', (req, res) => {
  let review = req.body;

  Rev.addReview(review)
    .then(newReview => {
      res.status(201).json(newReview);
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error' });
    });
});

//************* UPDATE REVIEW ****************//
router.put('/:id', validateReviewId, (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Rev.findReviewsBy({ id }).then(reviewInfo => {
    const review = reviewInfo;
    if (
      changes === review[0].changes
    ) {
      return res.status(200).json({ message: 'No changes to update' });
    } else {
      Rev.updateReview(id, changes)
        .then(info => {
          if (info) {
            res.status(202).json({ info: changes });
          } else {
            res.status(404).json({ message: 'Error locating review info' });
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Error updating review info' });
        });
    }
  });
});

//****************** DELETE REVIEW ********************//
router.delete('/:id', validateReviewId, (req, res) => {
  const { id } = req.params;
  Rev.deleteReview(id)
    .then(deleted => {
      res.status(200).json({ success: `the review was successfully deleted from the database` });
    })
    .catch(err => {
      res.status(500).json({ message: 'There was an error deleting this review.' });
    })
});

/**************************************************************************/

module.exports = router;
