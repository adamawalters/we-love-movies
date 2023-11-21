const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")
const theatersRouter = require("../theaters/theaters.router")
const reviewsRouter = require("../reviews/reviews.router")

router.route("/")
        .get(controller.list)
        .all(methodNotAllowed)

/* 
Handle errors if movie doesn't exist
Account for /:movieId/theaters
*/
router.route("/:movieId")
        .get()  


/* Will need to merge params with theaters*/
router.use("/:movieId/theaters", theatersRouter)



router.use("/movieId/reviews", reviewsRouter)


module.exports = router;
