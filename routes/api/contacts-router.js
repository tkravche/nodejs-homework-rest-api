const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const {validateBody} = require("../../decorators");
const isBodyEmpty = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll)

// contactsRouter.get("/:id", contactsController.getById)

// contactsRouter.post("/", isBodyEmpty, validateBody(schemas.contactAddSchema), contactsController.add)

// contactsRouter.put("/:id", isBodyEmpty, validateBody(schemas.contactAddSchema), contactsController.updateById)

// contactsRouter.delete("/:id", contactsController.deleteById)

module.exports = contactsRouter;