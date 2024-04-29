/* GET Character List */
const characterlist = (req, res) => {
    res.render('character-list', {title: 'Character List'});
};

/* GET 'Character info' page */
const characterInfo = (req, res) => {
    res.render('character-info', { title: 'Character Info'});
};

/* GET 'Lockout Calendar' page */
const lockoutCalendar = (req, res) => {
    res.render('lockout-calendar', { title: 'Lockout Calendar'});
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
    lockoutCalendar,
    addLockdown,
    addCharacter
}