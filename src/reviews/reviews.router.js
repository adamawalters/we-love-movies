const router = require("express").Router({mergeParams : true});
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");


router.route("/")
            .get(controller.listMovieReviews)
            .all(methodNotAllowed)



router.route("/:reviewId")
            .get(controller.read) //remove before submission
            .delete(controller.delete)
            .put(controller.update)
            .all(methodNotAllowed)


module.exports = router;