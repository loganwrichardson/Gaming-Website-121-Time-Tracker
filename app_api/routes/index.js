const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlCharacters = require('../controllers/characters');
const ctrlLockdowns = require('../controllers/lockdowns');

//users
router
    .route('/users/') 
    .post(ctrlUsers.usersCreate);
router 
    .route('/users/:userid')
    .get(ctrlUsers.usersReadOne)
    .put(ctrlUsers.usersUpdateOne)
    .delete(ctrlUsers.usersDeleteOne);
//characters
router
    .route('/users/:userid/characters/')
    .get(ctrlCharacters.charactersGetFromUser)
    .post(ctrlCharacters.charactersCreate);
router
    .route('/users/:userid/characters/:characterid')
    .get(ctrlUsers.usersReadOne)
    .put(ctrlUsers.usersUpdateOne)
    .delete(ctrlUsers.usersDeleteOne)
//lockdown
router
    .route('/lockdowns')
    .get(ctrlLockdowns.lockdownsListByStartTime)
    .post(ctrlLockdowns.lockdownsCreate)
router
    .route('/lockdowns/:lockdownid')
    .get(ctrlLockdowns.lockdownsReadOne)
    .delete(ctrlLockdowns.lockdownsDeleteOne)

module.exports = router;