const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")


const movieConfig = {
    "movie_id" : ["movies", null, "movie_id"],
    "title" : ["movies", null, "title"],
    "rating" : ["movies", null, "rating"],
    "runtime_in_minutes" : ["movies", null, "runtime_in_minutes" ],
    "description" : ["movies", null, "description"],
    "image_url" : ["movies", null, "image_url"],
    "is_showing" : ["movies", null, "is_showing"],
    "movies_created_at" : ["movies", null, "created_at"],
    "movies_updated_at" : ["movies", null, "updated_at"],
    "movies_theater_id" : ["movies", null, "theater_id"]
}

const reduceMovies = reduceProperties("theater_id", movieConfig)

async function list(){
    const theatersWithMoviesArray = await knex("theaters as t")
                .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
                .join("movies as m", "mt.movie_id", "m.movie_id")
                .select("t.theater_id", "t.name", "t.address_line_1", "t.address_line_2", "t.city", "t.state", "t.zip", "t.created_at", "t.updated_at", "m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url", "m.created_at as movies_created_at", "m.updated_at as movies_updated_at", "mt.is_showing", "mt.theater_id as movies_theater_id")

    return reduceMovies(theatersWithMoviesArray, null)

}



module.exports = {
    list,
}