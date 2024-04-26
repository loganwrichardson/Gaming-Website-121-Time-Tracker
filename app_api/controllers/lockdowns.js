const mongoose = require('mongoose');
const users = mongoose.model('User');

const lockdownsCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const lockdownsListByStartTime = (req, res) => {
    users.aggregate( [
        //Pick out the characters
        {
            $unwind : "$characters"
        }
    ] )
    .exec((err, lockdowns) => {
        return (res)
            .status(200)
            .json(lockdowns)
    })
};
const lockdownsReadOne = (req, res) => {
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
                  .json({"message": "character not found"});
              } else {
                if (character.lockdowns && character.lockdowns.length > 0) {
                    const lockdown = character.lockdowns.id(req.params.lockdownid);
                    if (!lockdown) {
                        return res
                          .status(404)
                          .json({"message": "lockdown not found"});
                      } else {
                        const response = {
                          user: {
                            name: user.name,
                            id: req.params.userid
                          },
                          character: {
                            name: character.name,
                            id: req.params.characterid
                          },
                          lockdown
                        };
              
                        return res
                          .status(200)
                          .json(response);
                      }
                } else {
                    return res.status(404).json({"message": "No characters found"})
                }
              }
        } else {
            return res.status(404).json({"message": "No characters found"})
        }
        
    });
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