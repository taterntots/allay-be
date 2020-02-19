const router = require("express").Router();

const User = require("../helpers/users-model.js");

/**************************************************************************/

//                  for endpoints beginning with /user                    //

/**************************************************************************/

//GET USER BY ID
// router.get("/", (req, res) => {
//   const id = req.user.id;

//   User.findById(id)
//     .then(user => {
//       res.json(user);
//     })
//     .catch(err => res.send(err));
// });

//UPDATE USER INFO
router.put("/", (req, res) => {
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

// DELETE account - User type: parent
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

/**************************************************************************/

module.exports = router;
