const mongoose = require('mongoose');
const users = mongoose.model('User');

const charactersCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const charactersGetFromUser = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const charactersReadOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const charactersUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const charactersDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    charactersCreate,
    charactersDeleteOne,
    charactersGetFromUser,
    charactersReadOne,
    charactersUpdateOne
}