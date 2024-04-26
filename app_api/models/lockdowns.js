const mongoose = require('mongoose');

const lockdownSchema = new mongoose.Schema({
    reason: {type: String},
    startDate: {type: Date},
    endDate: {type: Date}
  });

mongoose.model('Lockdown', lockdownSchema);