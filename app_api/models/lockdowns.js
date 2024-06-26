const mongoose = require('mongoose');

const lockdownSchema = new mongoose.Schema({
    character: {type: String},
    reason: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    characterName: {type: String}
  });

mongoose.model('Lockdown', lockdownSchema);