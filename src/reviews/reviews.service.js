const knex = require("../db/connection");

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

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id: review_id }).del();
}

async function update(review) {

  await knex("reviews").update(review).where({ review_id: review.review_id });

  let response = await knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where("r.review_id", review.review_id)

    response =  response.map((review) => addCritics(review))

    return response;
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
  read,
  delete: destroy,
  update,
  listMovieReviews,
};
