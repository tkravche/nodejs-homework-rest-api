const { HttpError } = require("../helpers");

const isBodyEmptyFavorite = async (req, res, next) => {
  if (!req.body || !Object.keys(req.body).length) {
    next(HttpError(400, "missing field favorite"));
  }
  next();
};
module.exports = isBodyEmptyFavorite;
