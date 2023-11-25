const router = require("express").Router({mergeParams : true});
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");


router.route("/")
            .get(controller.listMovieReviews)
            .all(methodNotAllowed)



router.route("/:reviewId")
            .delete(controller.delete)
            .put(controller.update)
            .all(methodNotAllowed)


module.exports = router;