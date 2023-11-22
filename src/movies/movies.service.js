const knex = require("../db/connection")

const mapProperties = require("../utils/map-properties")

const addCritics = mapProperties({
    critic_id : "critic.critic_id",
    preferred_name: "critic.preferred_name", 
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    critic_updated_at: "critic.updated_at",
    critic_created_at: "critic.created_at",
    critic_critic_id: "critic_id",
})

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

function listMovieReviews(movieId) {
    return knex("reviews as r")
                        .join("critics as c", "r.critic_id", "c.critic_id")
                        .select("r.review_id", "r.content", "r.score", "r.created_at", "r.updated_at", "r.critic_id", "r.movie_id",
                                "c.critic_id as critic_critic_id", "c.preferred_name", "c.surname", "c.organization_name", "c.created_at as critic_created_at", "c.updated_at as critic_updated_at"
                        )  
                        .where("r.movie_id", movieId)           
                        .then((reviewList) => {
                            return reviewList.map((review) => addCritics(review));
                        })                         
}


module.exports = {
    list,
    listShowing,
    read,
    listPlayingTheaters,
    listMovieReviews,
}