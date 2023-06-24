const express = require("express");

const authController = require("../../controllers/auth-controller");

const { validateBody } = require("../../decorators");

const { isBodyEmpty, authenticate, upload } = require("../../middlewares");

const userSchemas = require("../../schemas/users");

const authRouter = express.Router();

authRouter.post(
  "/register",
  isBodyEmpty,
  validateBody(userSchemas.userRegisterSchema),
  authController.signup
);
authRouter.post(
  "/login",
  isBodyEmpty,
  validateBody(userSchemas.userLoginSchema),
  authController.signin
);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch(
  "/",
  authenticate,
  validateBody(userSchemas.userUpdateSchema),
  authController.subscriptionUpdate
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.avatarUpdate
);
module.exports = authRouter;
