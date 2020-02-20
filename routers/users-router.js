const router = require("express").Router();
const Users = require("../helpers/users-model");

//Create some routes!

router.get("/user/:id", (req, res) => {
	Users.findUserById(req.params.id)
		.then(user => res.json(user))
		.catch(err => console.log(err));
});

router.get("/user/reviews/:id", (req, res) => {
	Users.findUserReviews(req.params.id)
		.then(user => res.json(user))
		.catch(err => console.log(err));
});

module.exports = router;
