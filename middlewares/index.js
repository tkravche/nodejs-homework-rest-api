const isBodyEmpty = require("./isBodyEmpty");
const isBodyEmptyFavorite = require("./isBodyEmptyFavorite");
const handleMongooseError = require("./handleMongooseError");
const isValidId = require("./isValidId");

module.exports = {
  isBodyEmpty,
  handleMongooseError,
  isValidId,
  isBodyEmptyFavorite
};
