const express = require('express');
const router = express.Router();
// const ctrlMain = require('../controllers/others');
const ctrlCharacters = require('../controllers/characters');
const ctrlOthers = require('../controllers/others');

/* Character pages */
router.get('/', ctrlCharacters.characterlist);
router.get('/character/info', ctrlCharacters.characterInfo);
router.get('/character/lockoutcalendar', ctrlCharacters.lockoutCalendar);
router.get('/character/lockdown/new', ctrlCharacters.addLockdown);
router.get('/character/addcharacter', ctrlCharacters.addCharacter);

/* Other pages */
router.get('/about', ctrlOthers.about);

// const homepageController = (req, res) => {
//   res.render('index', { title: 'Express' });
// };

module.exports = router;
