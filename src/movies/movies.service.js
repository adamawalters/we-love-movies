const knex = require("../db/connection")

function list(req, res, next) {
    return knex("movies as m")
                        .select("m.movie_id as id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
}

function listShowing(req, res) {
    return knex("movies as m")
                        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
                        .distinct("m.movie_id as id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
                        .where({is_showing : true})
}


module.exports = {
    list,
    listShowing,
}