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
    .json({"status" : "success"})
};
const charactersReadOne = (req, res) => {
    users
    .findById(req.params.userid)
    .select('name characters')
    .exec((err, user) => {
        if (!user) {
            return res
            .status(404)
            .json({"message": "user not found"});
        } else if (err) {
            return res
            .status(404)
            .json(err);
        }
        if (user.characters && user.characters.length > 0) {
            const character = user.characters.id(req.params.characterid);
            if (!character) {
                return res
                  .status(404)
                  .json({"message": "review not found"});
              } else {
                const response = {
                  user: {
                    name: user.name,
                    id: req.params.userid
                  },
                  character
                };
      
                return res
                  .status(200)
                  .json(response);
              }
        } else {
            return res.status(404).json({"message": "No characters found"})
        }
        
    });
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