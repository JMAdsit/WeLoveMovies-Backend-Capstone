const knex = require("../db/connection");

function update(reviewId, content){
  return knex("reviews")
      .select("*")
      .where({ review_id: reviewId })
      .update(content, "*");
}

function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ "review_id": reviewId })
    .first();
}

function readReview(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.review_id": reviewId })
}

function destroy(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ "review_id": reviewId })
    .del();
}

module.exports = {
  update,
  readReview,
  read,
  destroy
}