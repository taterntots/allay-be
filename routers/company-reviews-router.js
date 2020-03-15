const router = require('express').Router();

const CRevs = require('../helpers/company-reviews-model');

router.get('/', (req, res) => {
  CRevs.findCompanyReviews()
    .then(reviews => {
      res.json(reviews);
    })
    .catch(err => {
      res.status(500).json({
        error: 'server error not getting the reviews'
      });
    });
});

module.exports = router;
