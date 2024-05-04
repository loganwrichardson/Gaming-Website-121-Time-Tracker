const mongoose = require('mongoose');
const users = mongoose.model('User');
const lockdowns = mongoose.model('Lockdown');

const doAddCharacter = (req, res, user) => {
    console.log("doAddCharacter");
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
    console.log("charactersCreate");
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
            //request the lockdown directly from the lockdown database
            lockdowns
              .findById(character.lockdown)
              .exec((err, lockdown) => {
                console.log("LOCKDOWN");
                console.log(lockdown);
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
                      character,
                      lockdown: lockdown
                    };
          
                    return res
                      .status(200)
                      .json(response);
                  }
              })
        } else {
            return res.status(404).json({"message": "No characters found"})
        }
        
    });
};

//Used by the controller to go from a name to an id the database can use.
//Ironically, this uses the database to do this.
const charactersFindByName = (req, res) => {
  if (!req.params.userid || !req.params.characterName) {
    return res
      .status(404)
      .json({
        "message": "Not found, userid and characterid are both required"
      });
  }
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
      //Grab the character by id
      users
        .aggregate([
          {$unwind : {path: "$characters"}},
          {$project: { _id: 0, 'characters._id': 1, 'characters.name': 1}},
          {$replaceRoot: {newRoot: "$characters"}},
          {$match: { name : req.params.characterName}}
          ])
        .exec((err, character) => {
          console.log("Character:", character);
          if (!character.length) {
            return res
              .status(404)
              .json({"message": "can't find a character by this name"});
          } else if (err) {
            return res
              .status(404)
              .json({"message": "Something went wrong"});
          }
          res
            .status(200)
            .json(character[0])
        })
  });
}

const charactersAddItem = (req, res) => {
  console.log("Made it to charactersAddItem:", req.params);
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
              //figures out which field to edit
              switch(req.body.field) {
                case 'abilities':
                  thisCharacter.abilities.push(req.body.fieldData);
                  break;
                case 'magicItems':
                  thisCharacter.magicItems.push(req.body.fieldData);
                  break;
                case 'notes':
                  thisCharacter.notes = req.body.fieldData;
                  break;
                default:
                  console.log("uh oh");
              }
              user.save((err, user) => {
                if (err) {
                  return res
                    .status(404)
                    .json(err);
                } else {
                  return res
                    .status(200)
                    .json(thisCharacter);
                }
              });
            }
          } else {
            return res
              .status(404)
              .json({
                "message": "No character to update"
              });
          }
        }
      );
}

const charactersUpdateLockdown = (req, res) => {
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
          console.log(thisCharacter);
          if (!thisCharacter) {
            res
              .status(404)
              .json({
                "message": "Character not found"
              });
          } else {
            console.log("BODY FROM API: ", JSON.stringify(req.body)); 
            thisCharacter.lockdown = req.body.lockdown;
            user.save((err, character) => {
              if (err) {
                res
                  .status(404)
                  .json(err);
              } else {
                res
                  .status(200)
                  .json(character);
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
    charactersFindByName,
    charactersGetFromUser,
    charactersReadOne,
    charactersUpdateOne,
    charactersUpdateLockdown,
    charactersAddItem
}