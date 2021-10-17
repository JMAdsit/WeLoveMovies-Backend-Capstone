const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function reviewExists(req, res, next) {
  const data = await reviewsService.read(req.params.reviewId);
  if(data) {
    res.locals.review = data;
    return next();
  }
  next({ status: 404, message: "Review cannot be found."});
}


async function update(req, res, next) {
  const reviewId = req.params.reviewId;
  const content = req.body.data;
  
  await reviewsService.update(reviewId, content);

  const data = await reviewsService.readReview(reviewId);
  
  const reduceReviews = reduceProperties("review_id", {
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
  });
  
  let updatedReview = reduceReviews(data);
  res.json({ data: updatedReview[0] });
}

async function destroy(req, res, next) {
  const reviewId = req.params.reviewId;
  await reviewsService.destroy(reviewId);
  res.sendStatus(204);
}

module.exports = {
  update: [reviewExists, update],
  delete: [reviewExists, destroy]
}
