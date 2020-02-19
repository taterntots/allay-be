const router = require("express").Router();

const Rev = require("../helpers/reviews-model.js");

/**************************************************************************/

//                for endpoints beginning with /companies                   //

/**************************************************************************/

//************** GET ALL REVIEWS ****************//
router.get("/", (req, res) => {
  Rev.find()
    .then(review => {
      res.json(review);
    })
    .catch(err => res.send(err));
});

//************* UPDATE REVIEW ****************//
// router.put("/", (req, res) => {
//   const changes = req.body;
//   const id = req.review.id;

//   Rev.edit(id, changes)
//     .then(info => {
//       if (info) {
//         res.status(200).json({ info: changes });
//       } else {
//         res.status(404).json({ message: "Error locating review info" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: "Error updating review info" });
//     });
// });

/**************************************************************************/

module.exports = router;
