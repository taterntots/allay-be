const router = require("express").Router();

const Co = require("../helpers/companies-model.js");

/**************************************************************************/

//                for endpoints beginning with /companies                   //

/**************************************************************************/

//***************** ADD NEW COMPANY *******************//
router.post("/", (req, res) => {
  let company = req.body;

  Co.add(company)
    .then(newCompany => {
      res.status(201).json(newCompany);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error" });
    });
});

//************** GET ALL COMPANIES ****************//
router.get("/", (req, res) => {
  Co.find()
    .then(company => {
      res.json(company);
    })
    .catch(err => res.send(err));
});

//************* UPDATE COMPANY INFO ****************//
// router.put("/", (req, res) => {
//   const changes = req.body;
//   const id = req.company.id;

//   Co.edit(id, changes)
//     .then(info => {
//       if (info) {
//         res.status(200).json({ info: changes });
//       } else {
//         res.status(404).json({ message: "Error locating company info" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: "Error updating company info" });
//     });
// });

/**************************************************************************/

module.exports = router;
