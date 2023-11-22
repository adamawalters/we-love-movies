const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res) {
    const is_showing = req.query.is_showing;
    if(is_showing === "true") {
        res.json({data : await service.listShowing()}) 
    } else {
        res.json({data : await service.list()})
    }
}

async function read(req, res) {
    const movie = res.locals.movie;
    res.json({
        data : movie
    })
}

async function listPlayingTheaters(req, res) {
    const movie = res.locals.movie;
    const playingTheaters = await service.listPlayingTheaters(movie.id)
    res.json({data : playingTheaters})
}

async function listMovieReviews(req, res) {
    const movie = res.locals.movie;
    const movieReviews = await service.listMovieReviews(movie.id);
    res.json({data : movieReviews})
}

/*Validations */

async function movieExists(req, res, next) {
    const movieId = req.params.movieId;
    const movie = await service.read(movieId);
    if(movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({
        status: 404,
        message: `Movie could not be found`
    })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    listPlayingTheaters: [asyncErrorBoundary(movieExists), listPlayingTheaters],
    listMovieReviews: [asyncErrorBoundary(movieExists), listMovieReviews]
}