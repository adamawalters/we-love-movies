const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")
const theatersRouter = require("../theaters/theaters.router")
const reviewsRouter = require("../reviews/reviews.router")


router.route("/")
        .get(controller.list)
        .all(methodNotAllowed)


router.route("/:movieId")
        .get(controller.read)  


router.route("/:movieId/theaters")
        .get(controller.listPlayingTheaters)


 router.route("/:movieId/reviews")
        .get(controller.listMovieReviews)



module.exports = router;
