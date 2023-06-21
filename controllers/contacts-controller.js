const fs = require("fs/promises")
const path = require("path");

const Contact = require("../models/contact");

const { ctrlWrapper } = require("../decorators");

const { HttpError } = require("../helpers");

const avatarDir = path.resolve("public", "avatars");

const getAll = async (req, res) => {
  const {favorite} = req.query;
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const dbRequest = favorite !== undefined? {owner, favorite}: {owner};
 
  const result = await Contact.find(dbRequest,"-createdAt -updatedAt", { skip, limit }).populate(
    "owner",
    "name email"
  );
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} was not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const {path: oldPath, filename} = req.file;
  const newPath = path.join(avatarDir, filename)
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, avatarURL, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body);

  if (!result) {
    throw HttpError(404, `Contact with id=${id} was not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} was not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} was not found`);
  }

  res.json({
    message: "Contact deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
  };
