const router = require("express").Router();

const User = require("../helpers/users-model.js");
const Rev = require("../helpers/reviews-model.js");

/**************************************************************************/

//                  for endpoints beginning with /user                    //

/**************************************************************************/

//*************** GET USER BY ID *****************//
// router.get("/:id", (req, res) => {
//   const id = req.user.id;

//   User.findById(id)
//     .then(user => {
//       res.json(user);
//     })
//     .catch(err => res.send(err));
// });

//*************** UPDATE USER INFO ******************//
router.put("/:id", (req, res) => {
  const changes = req.body;
  const id = req.user.id;

  User.edit(id, changes)
    .then(info => {
      if (info) {
        res.status(200).json({ info: changes });
      } else {
        res.status(404).json({ message: "Error locating user info" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error updating user info" });
    });
});

//****************** DELETE ACCOUNT ********************//
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      const deleted = await User.remove(id);
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Error locating user." });
    }
  } catch {
    res
      .status(500)
      .json({ message: "There was an error deleting your account." });
  }
});

//***************** ADD NEW REVIEW *******************//
router.post("/:id/reviews", (req, res) => {
  let review = req.body;

  Rev.add(review)
    .then(newReview => {
      res.status(201).json(newReview);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error" });
    });
});

/**************************************************************************/

module.exports = router;
