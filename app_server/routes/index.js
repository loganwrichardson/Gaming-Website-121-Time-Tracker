const express = require('express');
const router = express.Router();
// const ctrlMain = require('../controllers/others');
const ctrlCharacters = require('../controllers/characters');
const ctrlOthers = require('../controllers/others');

/* Character pages */
//The URL would need to include the user id to get any useful information
router.get('/users/:userid/characters/', ctrlCharacters.characterlist);
router.get('/users/:userid/characters/:characterid/info', ctrlCharacters.characterInfo);
router.get('/lockoutcalendar', ctrlCharacters.lockoutCalendar);
router.get('/users/:userid/characters/:characterid/lockdown/new', ctrlCharacters.addLockdown);
router.get('/users/:userid/characters/addcharacter', ctrlCharacters.addCharacter);

/* Other pages */
router.get('/about', ctrlOthers.about);

// const homepageController = (req, res) => {
//   res.render('index', { title: 'Express' });
// };

module.exports = router;
