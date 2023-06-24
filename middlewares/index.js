const isBodyEmpty = require("./isBodyEmpty");
const isBodyEmptyFavorite = require("./isBodyEmptyFavorite");
const isValidId = require("./isValidId");
const authenticate= require("./authenticate");
const upload =  require("./upload");

module.exports = {
  isBodyEmpty,
  isValidId,
  isBodyEmptyFavorite,
  authenticate,
  upload,
};
