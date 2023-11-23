const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id: review_id }).del();
}

function update(review) {
  return knex("reviews")
    .update(review)
    .where({ review_id: review.review_id })
    .then(
      knex("reviews as r")
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
    );
}

module.exports = {
  read,
  delete: destroy,
  update,
};
