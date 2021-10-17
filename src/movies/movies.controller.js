const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if(movie) {
    res.locals.movie = movie;
    next();
  }
  next({ status: 404, "error": "Movie cannot be found."});
}

async function list(req, res, next) {
  const is_showing = req.query.is_showing;
  const data = await moviesService.list(is_showing);
  res.json({ data });
}

async function read(req, res, next) {
  const data = res.locals.movie;
  res.json({ data });
}

async function listTheaters(req, res, next) {
  const { movieId } = req.params;
  const data = await moviesService.listTheaters(movieId);
  res.json({ data });
}

async function listReviews(req, res, next) {
  const { movieId } = req.params;
  const data = await moviesService.listReviews(movieId);
  
  const reduceReviews = reduceProperties("review_id", {
    critic_id: ["critic", "critic_id"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
    created_at: ["critic", "created_at"],
    updated_at: ["critic", "updated_at"]
  });
  
  res.json({ data: reduceReviews(data) });
}


module.exports = { 
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheaters: [asyncErrorBoundary(listTheaters)],
  listReviews: [asyncErrorBoundary(listReviews)]
};