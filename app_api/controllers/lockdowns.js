const mongoose = require('mongoose');
const lockdown = mongoose.model('Lockdown');

const lockdownsCreate = (req, res) => {
    lockdown.create({
        character: req.body.character,
        startDate: req.body.startDate,
        reason: req.body.reason,
        endDate: req.body.endDate
      },
      (err, lockdown) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          res
            .status(201)
            .json(lockdown);
        }
      });
};
const lockdownsListByStartTime = (req, res) => {
    lockdown.find()
    .sort({endDate : -1})
    .exec((err, lockdowns) => {
        return (res)
            .status(200)
            .json(lockdowns)
    })
};
const lockdownsReadOne = (req, res) => {
    lockdown
    .findById(req.params.lockdownid)
    .exec((err, lockdownFound) => {
      if (!lockdownFound) {
        return res
          .status(404)
          .json({"message": "lockdown not found"});
      } else if (err) {
        return res
          .status(404)
          .json(err);
      } else {
        return res
          .status(200)
          .json(lockdownFound);
      }
    });
};
const lockdownsDeleteOne = (req, res) => {
    const {lockdownid} = req.params;
    if (lockdownid) {
      lockdown
        .findByIdAndRemove(lockdownid)
        .exec((err, location) => {
            if (err) {
              return res
                .status(404)
                .json(err);
            }
            res
              .status(204)
              .json(null);
          }
      );
    } else {
      res
        .status(404)
        .json({
          "message": "No Lockdown"
        });
    }
};

module.exports = {
    lockdownsCreate,
    lockdownsDeleteOne,
    lockdownsListByStartTime,
    lockdownsReadOne
}