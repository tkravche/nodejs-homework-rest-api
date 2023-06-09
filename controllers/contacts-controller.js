const Contact = require("../models/contacts/contact");

const { ctrlWrapper } = require("../decorators");

const { HttpError } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.getContactById(id);
//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} was not found`);
//   }
//   res.json(result);
// };

// const add = async (req, res) => {
//   const { name, email, phone } = req.body;
//   const result = await contactsService.addContact(name, email, phone);
//   res.status(201).json(result);
// };

// const updateById = async (req, res) => {
//   const { id } = req.params;

//   const result = await contactsService.updateContact(id, req.body);

//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} was not found`);
//   }
//   res.json(result);
// };

// const deleteById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.removeContact(id);
//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} was not found`);
//   }

//   res.json({
//     message: "Contact deleted",
//   });
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  // add: ctrlWrapper(add),
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
