/* GET Character List */
const characterlist = (req, res) => {
    res.render('character-list', {
        title: 'Character List',
        pageHeader: {
            title: '1 to 1 Time Tracker',
            strapline: 'Track your game characters!',
        },
        sidebar: {
            sidebarLead:'1-to-1 tracker helps you keep track of your game characters.',
            context: ' No more tracking characters on your own with pesky calendars and notebooks. Let us do the heavy lifiting. The latest inovation in gameplay. Our system will revolutionize your gameplay forever!!!',
        },
        pcList: [{
            name: 'Gandalf',
            lockoutStatus: 'Locked Out',
            level: 'Level 20',
            stats: ['Body 10', 'Mind 16', 'Soul 20', 'HP 60'],
        }, {
            name: 'Optimus Prime',
            lockoutStatus: 'Available',
            level: 'Level 18',
            stats: ['Body 16', 'Mind 14', 'Soul 10', 'HP 100'],
        }, {
            name: 'Eric Cartman',
            lockoutStatus: 'Available',
            level: 'Level 08',
            stats: ['Body 05', 'Mind 12', 'Soul 14', 'HP 84'],
        }]
    });
};

/* GET 'Character info' page */
const characterInfo = (req, res) => {
    res.render('character-info', { 
        title: '1 to 1 Time Tracker',
        pageHeader: {title: 'Character Info'},
        sidebar: {
            context: 'Track your character\'s info.'
        },
        // pcInfoList: [{
        character: {
            name: 'Gandalf',
            lockoutStatus: 'Locked Out',
            level: 'Level 20',
            stats: ['Body 10', 'Mind 16', 'Soul 20', 'HP 60'],
            abilities: ['Resist Type (Fire)', 'RT(cold)', 'RT(wind)', 'RT(earth)', 'RT(holy)', 'RT(curse)', 'RT(pyschic)', 'RT(perfection)', 'Magic Burst', 'Summon Creature', 'Detect Magic', 'Foley Illusion'],
            magicItems: ['White Staff', 'Book of Hope', 'Jewel of Elements', 'Rat Totem', 'Kobol and Serum', 'Eye of Sauron', 'Bag of Holding', 'Narya(The Secret Flame)', 'Pipe', 'Old Toby', 'Fireworks'],
            notes: ['Gandalf, known temporarily as the Grey and later the White, and originally named Olórin (Quenya), was an Istar (Wizard), dispatched to Middle-earth in the Third Age to combat the threat of Sauron. He joined Thorin II and his company to reclaim the Lonely Mountain from Smaug, helped form the Fellowship of the Ring to destroy the One Ring, and led the Free Peoples in the final campaign of the War of the Ring. '],
        // }, {
        //     name: 'Optimus Prime',
        //     lockoutStatus: 'Available',
        //     level: 'Level 18',
        //     stats: ['Body 16', 'Mind 14', 'Soul 10', 'HP 100'],
        //     abilities: ['Cybertronian speed', 'Expert Driver', 'Hand-to-hand-combat', 'Swordmanship', 'Gyro Strike', 'Blizard Storm', 'Healing Factor', 'Power Stream'],
        //     magicItems: ['Mystic Talisman', 'Energon-axe', 'Ion Blaster'],
        //     notes: ['Optimus Prime is the awe-inspiring leader of the Autobot forces. Selfless and endlessly courageous, he is the complete opposite of his mortal enemy Megatron. Originally a mere civilian known as Orion Pax or Optronix, he was chosen by the Matrix of Leadership to command, the first in a number of heavy burdens he has been forced to bear. Another is his bringing of the Transformers\' conflict to Earth. Every casualty, human or Cybertronian weighs heavily on his spark. He does not show this side to his soldiers and never succumbs to despair. The Autobots need a decisive, charismatic leader and that is what he gives them. It was that leadership which turned the tide of the Great War.'],
        // }, {
        //     name: 'Eric Cartman',
        //     lockoutStatus: 'Available',
        //     level: 'Level 08',
        //     stats: ['Body 05', 'Mind 12', 'Soul 14', 'HP 84'],
        //     abilities: ['Foul Mouth', 'Gaslight', 'Social Manipulation', 'Ventriloquism', 'Multilingualism', 'Summon Cuthulu'],
        //     magicItems: ['The Sword of a Thousand Truths', 'The Stick of Truth', 'Mr. Hanky', 'Racoon Costume'],
        //     notes: ['Eric Theodore Cartman, usually referred to as just Cartman, is the main character of the South Park franchise. Carman is the loveable villain of the show, often manipulating situations to his advantage'],
        //}],
        } //temp - will replace with above live }],
    });
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