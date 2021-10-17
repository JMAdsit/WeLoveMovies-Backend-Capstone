const knex = require("../db/connection");


function list() {
  return knex.raw(`
  SELECT *
  FROM movies m, theaters t, movies_theaters mt
  WHERE mt.movie_id = m.movie_id 
  AND mt.theater_id = t.theater_id
  `).then(data => data)
}

module.exports = {
  list
}