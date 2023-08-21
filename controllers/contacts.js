const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {  
    const result = await contacts.listContacts();
    res.json(result);  
}

const getById = async (req, res, next) => {  
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found by id');       
    } 
    res.json(result)  
}

const add = async (req, res, next) => {  
    // const { error } = addSchema.validate(req.body);
    // if (error) { 
    //   throw HttpError(400, 'Missing required name field');
    // }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);  
}

const updateById = async (req, res, next) => {
    // const { error } = addSchema.validate(req.body);
    // if (error) {
    //   throw HttpError(400, 'Missing fields');
    // }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, 'Not found by id');
    }
    res.json(result);  
}

const deleteById = async (req, res, next) => {  
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, 'Not found by id');
    }
    res.json({
      message: "Сontact deleted"
    })   
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}

