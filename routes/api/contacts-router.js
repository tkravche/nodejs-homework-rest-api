const express = require("express");

const contactsController = require("../../controllers/contacts-controller");
const {isValidId, authenticate, upload} = require("../../middlewares");
const {validateBody} = require("../../decorators");
const {isBodyEmpty} = require("../../middlewares");
const {isBodyEmptyFavorite} = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll)

contactsRouter.get("/:id", isValidId, contactsController.getById)

contactsRouter.post("/", upload.single("avatar"), isBodyEmpty, validateBody(schemas.contactAddSchema),  contactsController.add)

contactsRouter.put("/:id", isValidId, isBodyEmpty, validateBody(schemas.contactAddSchema), contactsController.updateById)

contactsRouter.patch("/:id/favorite", isValidId, isBodyEmptyFavorite, validateBody(schemas.contactUpdateFavoriteSchema), contactsController.updateStatusContact)

contactsRouter.delete("/:id", isValidId, contactsController.deleteById)

module.exports = contactsRouter;