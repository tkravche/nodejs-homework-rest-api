const express = require("express");

const contactsController = require("../../controllers/contacts-controller");
const {isValidId} = require("../../middlewares");
const {validateBody} = require("../../decorators");
const {isBodyEmpty} = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll)

contactsRouter.get("/:id", isValidId, contactsController.getById)

contactsRouter.post("/",isBodyEmpty, validateBody(schemas.contactAddSchema),  contactsController.add)

contactsRouter.put("/:id", isValidId, isBodyEmpty, validateBody(schemas.contactAddSchema), contactsController.updateById)

contactsRouter.patch("/:id/favorite", isValidId, isBodyEmpty, validateBody(schemas.contactUpdateFavoriteSchema),contactsController.updateFavorite)

contactsRouter.delete("/:id", isValidId, contactsController.deleteById)

module.exports = contactsRouter;