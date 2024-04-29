/* GET Character List */
const characterlist = (req, res) => {
    res.render('character-list', {
        title: 'Character List',
        pageHeader: {
            title: '1 to 1 Time Tracker',
            strapline: 'Track your game characters!'
        },
        pcList: [{
            name: 'Gandalf',
            lockoutStatus: 'Locked Out',
            level: 'Level 20',
            stats: ['Body 10', 'Mind 16', 'Soul 20', 'HP 60'],
            // body: 'Body 10',
            // mind: 'Mind 16',
            // soul: 'Soul 20',
            // hp: 'HP 60'
        }, {
            name: 'Optimus Prime',
            lockoutStatus: 'Available',
            level: 'Level 18',
            stats: ['Body 16', 'Mind 14', 'Soul 10', 'HP 100'],
            // body: 'Body 16',
            // mind: 'Mind 14',
            // soul: 'Soul 10',
            // hp: 'HP 100'
        }, {
            name: 'Eric Carman',
            lockoutStatus: 'Available',
            level: 'Level 08',
            stats: ['Body 05', 'Mind 12', 'Soul 14', 'HP 84'],
            // body: 'Body 05',
            // mind: 'Mind 12',
            // soul: 'Soul 14',
            // hp: 'HP 84'
        }]
    });
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