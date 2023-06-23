const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");

const User = require("../models/user");

const { ctrlWrapper } = require("../decorators");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarDir = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const gravatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    avatarURL: gravatarURL,
    password: hashPassword,
  });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No content" });
};

const subscriptionUpdate = async (req, res) => {
  const { subscription } = req.body;
  const { _id, email } = req.user;
  await User.findByIdAndUpdate(_id, { subscription });
  res.json({ email, subscription });
};

const avatarUpdate = async (req, res) => {
  if (!req.file) {
    throw HttpError(404, "Image not found");
  }
  const { path: oldPath, originalname } = req.file;
  const { _id } = req.user;
  
  await Jimp.read(oldPath)
    .then((image) => image.resize(250, 250).write(oldPath))
    .catch((err) => {
      console.error(err);
    });

  const newFilename = `${_id}_${originalname}`;
  const newPath = path.join(avatarDir, newFilename);

  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", newFilename);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};
module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
  avatarUpdate: ctrlWrapper(avatarUpdate),
};
