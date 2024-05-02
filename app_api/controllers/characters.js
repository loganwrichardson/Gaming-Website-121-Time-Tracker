const mongoose = require('mongoose');
const users = mongoose.model('User');

const doAddCharacter = (req, res, user) => {
    if (!user) {
        res
          .status(404)
          .json({"message": "user not found"});
      } else {
        const {name, className, hp, body, mind, soul, lockdown, abilities, magicItems, notes} = req.body;
        console.log("Name");
        console.log(name);
        const maxhp = hp;
        user.characters.push({
          name, className, hp, maxhp, body, mind, soul, lockdown, abilities, magicItems, notes
        });
        user.save((err, user) => {
          if (err) {
            res
              .status(400)
              .json(err);
          } else {
            const thisCharacter = user.characters.slice(-1).pop();
            res
              .status(201)
              .json(thisCharacter);
          }
        });
      }
}

const charactersCreate = (req, res) => {
    const userId = req.params.userid;
    if (userId) {
      users
        .findById(userId)
        .select('characters')
        .exec((err, user) => {
          if (err) {
            res
              .status(400)
              .json(err);
          } else {
            doAddCharacter(req, res, user);
          }
        });
    } else {
      res
        .status(404)
        .json({"message": "user not found"});
    }
};
const charactersGetFromUser = (req, res) => {
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
        return res
            .status(200)
            .json(user.characters)
        
    });
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
                  .json({"message": "character not found"});
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
    if (!req.params.userid || !req.params.characterid) {
        return res
          .status(404)
          .json({
            "message": "Not found, userid and characterid are both required"
          });
      }
      users
        .findById(req.params.userid)
        .select('characters')
        .exec((err, user) => {
          if (!user) {
            return res
              .status(404)
              .json({
                "message": "User not found"
              });
          } else if (err) {
            return res
              .status(400)
              .json(err);
          }
          if (user.characters && user.characters.length > 0) {
            const thisCharacter = user.characters.id(req.params.characterid);
            if (!thisCharacter) {
              res
                .status(404)
                .json({
                  "message": "Character not found"
                });
            } else {
              thisCharacter.name = req.body.name;
              thisCharacter.class = req.body.class;
              thisCharacter.hp = req.body.hp;
              thisCharacter.maxhp = req.body.maxhp;
              thisCharacter.body = req.body.body;
              thisCharacter.mind = req.body.mind;
              thisCharacter.spirit = req.body.spirit;
              thisCharacter.lockdown = req.body.lockdown;
              thisCharacter.abilities = req.body.abilities;
              thisCharacter.magicItems = req.body.magicItems;
              thisCharacter.notes = req.body.notes;
              user.save((err, user) => {
                if (err) {
                  res
                    .status(404)
                    .json(err);
                } else {
                  res
                    .status(200)
                    .json(thisCharacter);
                }
              });
            }
          } else {
            res
              .status(404)
              .json({
                "message": "No character to update"
              });
          }
        }
      );
};
const charactersDeleteOne = (req, res) => {
    const {userid, characterid} = req.params;
    if (!userid || !characterid) {
      return res
        .status(404)
        .json({'message': 'Not found, userid and characterid are both required'});
    }
  
    users
      .findById(userid)
      .select('characters')
      .exec((err, user) => {
        if (!user) {
          return res
            .status(404)
            .json({'message': 'user not found'});
        } else if (err) {
          return res
            .status(400)
            .json(err);
        }
  
        if (user.characters && user.characters.length > 0) {
          if (!user.characters.id(characterid)) {
            return res
              .status(404)
              .json({'message': 'character not found'});
          } else {
            user.characters.id(characterid).remove();
            user.save(err => {
              if (err) {
                return res
                  .status(404)
                  .json(err);
              } else {
                res
                  .status(204)
                  .json(null);
              }
            });
          }
        } else {
          res
            .status(404)
            .json({'message': 'No character to delete'});
        }
      });
};

module.exports = {
    charactersCreate,
    charactersDeleteOne,
    charactersGetFromUser,
    charactersReadOne,
    charactersUpdateOne
}