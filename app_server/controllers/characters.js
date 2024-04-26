/* GET Character List */
const characterlist = (req, res) => {
    res.render('character-list', {title: 'Character List'});
};

/* GET 'Character info' page */
const characterInfo = (req, res) => {
    res.render('index', { title: 'Character Info'});
};

/* GET 'Add lockdown' page */
const addLockdown = (req, res) => {
    res.render('character-lockdown-new-form', {title : 'Add Lockdown'});
};

/* Get 'Add character' page */
const addCharacter = (req, res) => {
    res.render('character-add-character-form', {title: 'Add Character'});
};

module.exports = {
    characterlist,
    characterInfo,
    addLockdown,
    addCharacter
}