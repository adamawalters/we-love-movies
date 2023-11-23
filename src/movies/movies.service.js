const knex = require("../db/connection")


function list() {
    return knex("movies as m")
                        .select("m.movie_id as id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
}

function listShowing() {
    return knex("movies as m")
                        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
                        .distinct("m.movie_id as id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
                        .where({is_showing : true})
}

function read(movieId) {
    return knex("movies as m")
                        .select("m.movie_id as id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
                        .where({movie_id : movieId})
                        .first()
}

function listPlayingTheaters(movieId) {
    return knex("movies_theaters as mt")
                        .join("theaters as t", "mt.theater_id", "t.theater_id")
                        .select("mt.theater_id", "t.name", "t.address_line_1", "t.address_line_2", "t.city", "t.state", "t.zip", "t.created_at", "t.updated_at", "mt.is_showing", "mt.movie_id")
                        .where("mt.movie_id", movieId)
                        .andWhere({is_showing : true})
                        
}



module.exports = {
    list,
    listShowing,
    read,
    listPlayingTheaters,
}