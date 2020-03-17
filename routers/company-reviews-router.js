const router = require('express').Router();

const CRevs = require('../helpers/company-reviews-model');

const { validateCompanyReviewId } = require('../middleware/index.js');

//************* GET ALL COMPANY REVIEWS ***************//
router.get('/', (req, res) => {
  CRevs.findCompanyReviews()
    .then(reviews => {
      res.json(reviews);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Error getting all company reviews.'
      });
    });
});
//************* GET ALL COMPANY REVIEW BY FILTER ***************//
router.get('/filter', (req, res) => {
  const filter = req.params.filter;

  CRevs.findCompanyReviewBy(filter)
    .then(review => {
      console.log(review);
      res.json(review);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Error getting a company by a filter.'
      });
    });
});

//************* GET A SINGLE COMPANY REVIEW BY ID ***************//

router.get('/:revId', validateCompanyReviewId, (req, res) => {
  const { revId } = req.params;

  CRevs.findCompanyReviewById(revId)
    .then(userReview => {
      res.json(userReview);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Error getting comany review by company review ID.'
      });
    });
});

module.exports = router;
