const mongoose = require('mongoose');
const users = mongoose.model('User');

const usersCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const usersReadOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const usersUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const usersDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    usersCreate,
    usersReadOne,
    usersUpdateOne,
    usersDeleteOne
}