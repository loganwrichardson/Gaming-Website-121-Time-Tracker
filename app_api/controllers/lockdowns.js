const mongoose = require('mongoose');
const users = mongoose.model('User');

const lockdownsCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const lockdownsListByStartTime = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const lockdownsReadOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const lockdownsDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    lockdownsCreate,
    lockdownsDeleteOne,
    lockdownsListByStartTime,
    lockdownsReadOne
}