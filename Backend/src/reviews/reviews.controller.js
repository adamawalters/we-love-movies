const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service")

async function destroy (req, res) {
    const review_id = res.locals.review.review_id;
    await service.delete(review_id);
    res.sendStatus(204);
}


async function update(req, res) {
    /* Expected body only updates the "score" and "content" properties */
    /* No validation of body or mismatching IDs */
    /* The updated review contains everything in the existing review, with the new properties overwritten, and the existing ID*/

    const newReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id : res.locals.review.review_id
    }

    const response = await service.update(newReview)
    res.json({ data : response})
}

async function listMovieReviews (req, res) {
    const movieId = res.locals.movieId;
    const movieReviews = await service.listMovieReviews(movieId);
    res.json({data : movieReviews})
}

/* Validations */

async function reviewExists (req, res, next) {
    const reviewId = req.params.reviewId;
    const review = await service.read(reviewId)
    if(review) {
        res.locals.review = review;
        next();
    } else {
        next({
            status: 404,
            message: `Review cannot be found`
        })
    }
}

async function pathHasMovieParam (req, res, next) {
    const movieId = req.params.movieId;
    if(movieId) {
        res.locals.movieId = movieId;
        return next();
    }
    next({
        status: 405,
        message: `You can only list reviews for a certain movie`
    });
}



module.exports = {
    delete : [asyncErrorBoundary(reviewExists), destroy],
    update: [asyncErrorBoundary(reviewExists), update],
    listMovieReviews : [pathHasMovieParam,listMovieReviews]
}
