const mongoose = require('mongoose');
const users = mongoose.model('User');

const usersCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const usersReadOne = (req, res) => {
    users
      .findById(req.params.userid)
      .exec((err, user) => {
        if (!user) {
          return res
            .status(404)
            .json({"message": "user not found"});
        } else if (err) {
          return res
            .status(404)
            .json(err);
        } else {
          return res
            .status(200)
            .json(user);
        }
      });
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