const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

const homepageController = (req, res) => {
  res.render('index', { title: 'Express' });
};
/* GET homepage. */
router.get('/', ctrlMain.index);

module.exports = router;
