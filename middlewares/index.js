const isBodyEmpty = require("./isBodyEmpty");
const isBodyEmptyFavorite = require("./isBodyEmptyFavorite");
const handleMongooseError = require("../helpers/handleMongooseError");
const isValidId = require("./isValidId");

module.exports = {
  isBodyEmpty,
  handleMongooseError,
  isValidId,
  isBodyEmptyFavorite
};
