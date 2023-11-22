const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service")

async function destroy (req, res) {
    const review_id = res.locals.review.review_id;
    await service.delete(review_id);
    res.sendStatus(204);
}

function read(req, res) {
    const review = res.locals.review;
    res.json({data : review})
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
    res.json({ data : await service.update(newReview)})
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



module.exports = {
    delete : [asyncErrorBoundary(reviewExists), destroy],
    read : [asyncErrorBoundary(reviewExists), read],
    update: [asyncErrorBoundary(reviewExists), update]
}

/* Remove "read" from controller */