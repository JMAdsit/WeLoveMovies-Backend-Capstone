const knex = require("../db/connection");

function list(is_showing) {
  if(is_showing === "true") {
      return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.*")
        .where({ "mt.is_showing": true })
        .groupBy("m.movie_id");
  }
  return knex("movies")
    .select("*");
}

function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ "movie_id": movieId })
    .first();
}

function listTheaters(movieId) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId })
    .groupBy("t.theater_id");
}

function listReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .groupBy("r.review_id");
}



module.exports = {
  list,
  read,
  listTheaters,
  listReviews
}