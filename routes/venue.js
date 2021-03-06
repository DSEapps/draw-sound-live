const router = require("express").Router();
const Controller = require("../controllers/Controller");

// Matches with "/venue"
// .get will all users in venue
router.route("/")
  .get(Controller.findAll)
  .post(Controller.findOrCreateUser);

// Matches with "/venue/:id"
router
  .route("/:id")
  .get(Controller.find)
  .put(Controller.update)
  .delete(Controller.remove);

module.exports = router;
