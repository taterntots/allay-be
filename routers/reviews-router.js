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
router.put('/', (req, res) => {
  const changes = req.body;
  const id = req.review.id;

  Rev.updateReview(id, changes)
    .then(review => {
      if (review) {
        res.status(200).json({ review: changes });
      } else {
        res.status(404).json({ message: 'Error locating review' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating review info' });
    });
});

//****************** DELETE REVIEW ********************//
router.delete('/:revId', validateReviewId, async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Rev.findReviewById(id);
    if (review) {
      const deleted = await Rev.deleteReview(id);
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: 'Error locating review.' });
    }
  } catch {
    res
      .status(500)
      .json({ message: 'There was an error deleting this review.' });
  }
});

/**************************************************************************/

module.exports = router;
