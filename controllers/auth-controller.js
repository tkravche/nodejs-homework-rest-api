const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const User = require("../models/users");

const { ctrlWrapper } = require("../decorators");

const { HttpError } = require("../helpers");

const {SECRET_KEY}= process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword  = await bcrypt.hash(password, 10);
  console.log(hashPassword);

  const newUser = await User.create({...req.body, password: hashPassword});

  res.status(201).json({
    email: newUser.email,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare  = await bcrypt.compare(password, user.password);
  
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is invalid");
  }

  const {_id: id} = user;
  const payload = {
    id,
  }
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});

  res.json({
    token,
  })
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};