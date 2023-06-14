const express = require('express');

const authController = require('../../controllers/auth-controller')

const {validateBody} = require("../../decorators");

const {isBodyEmpty} = require("../../middlewares");

const userSchemas = require('../../schemas/users')

const authRouter= express.Router();

authRouter.post("/register", isBodyEmpty, validateBody(userSchemas.userRegisterSchema), authController.signup)
authRouter.post("/login", isBodyEmpty, validateBody(userSchemas.userLoginSchema), authController.signin)

module.exports = authRouter;

 