const request = require('request');
const apiOptions = {server: 'http://localhost:3000'}

const decideLockdownStatus = (character) => {
    //actually do stuff to decide what the lockdown status should be
    character.lockdownStatus = "Locked Out";
}

const renderCharacters = (req, res, responseBody) => {
    //Make sure the response body is in the right output
    console.log(`responseBody: ${responseBody}`);
    responseBody.forEach(decideLockdownStatus);
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
        /*{
            FINAL OUTPUT
            name: 'Gandalf',
            lockoutStatus: 'Locked Out',
            level: 'Level 20',
            stats: ['Body 10', 'Mind 16', 'Soul 20', 'HP 60'],
        }*/
        stats: ['HP', 'Body', 'Mind', 'Spirit'],
        pcList: responseBody
    });
}

/* GET Character List */
const characterlist = (req, res) => {
    const path = `/api/users/${req.params.userid}/characters/`;        
    const requestOptions = {                    
        url: `${apiOptions.server}${path}`,       
        method: 'GET',                            
        json: {},                                 
        qs: {       
            userid: `${req.params.userid}`                                                
        }                                         
    };                                         
  request(                                    
    requestOptions,                          
    (err, response, body) => {                
      renderCharacters(req, res, body);               
    }                                         
  );
};

const renderCharacter = (req, res, responseBody) => {
    console.log("made it to render character!");
    console.log(responseBody);
    //do a quick check for if the lockdown is empty
    res.render('character-info', { 
        title: '1 to 1 Time Tracker',
        pageHeader: {title: 'Character Info'},
        sidebar: {
            context: 'Track your character\'s info.'
        },
        character: responseBody.character,
        noAbilties: 'There are no abilities yet. Add your own!',
        noMagicItems: 'There are no magical items yet. Add your own!',
        stats: ['HP', 'Body', 'Mind', 'Spirit'],
        lockdown: responseBody.lockdown
        }
    );
}
/* GET 'Character info' page */
const characterInfo = (req, res) => {
    const path = `/api/users/${req.params.userid}/characters/${req.params.characterid}`;        
    const requestOptions = {                    
        url: `${apiOptions.server}${path}`,       
        method: 'GET',                            
        json: {},                                 
        qs: {       
            userid: `${req.params.userid}`,
            characterid: `${req.params.characterid}`                                             
        }                                         
    };                                          
  request(                                    
    requestOptions,                          
    (err, response, body) => {                
      renderCharacter(req, res, body);               
    }                                         
  );
};

const renderLockoutCalendar = (req, res, responseBody) => {
    res.render('lockout-calendar', { 
        title: '1 to 1 Time Tracker',
        description: 'Character status will be tracked here',
        lockoutList: responseBody
        }
    );
}

/* GET 'Lockout Calendar' page */
const lockoutCalendar = (req, res) => {
    const path = '/api/lockdowns';    
    const requestOptions = {                    
        url: `${apiOptions.server}${path}`,       
        method: 'GET',                            
        json: {},                                 
        qs: {}                                         
    };                                          
  request(                                    
    requestOptions,                          
    (err, response, body) => {                
      renderLockoutCalendar(req, res, body);               
    }                                         
  );
};

const doAddLockdown = (req, res) => {
    const userid = req.params.userid;                
    const path = `/api/lockdowns/`; 
    console.log(req.body);    
    let postdata = {    
        character: "",                                    
        endDate: req.body.endDate,
        reason: req.body.reason,
        startDate: req.body.startDate                   
    };           
    //Find the character by name, we need the id
    const characterName = req.body.characterName;
    let characterId = 0;
    console.log("Asking API for the name's id");
    let requestOptions = {
        url: `${apiOptions.server}/api/users/6627e3747ca08ee65e7f8ec5/charactersByName/${req.body.characterName}`,                     
        method: 'GET',                                         
        json: postdata                                          
    };
    request(                                                  
        requestOptions,
        (err, {statusCode}, body) => {
            if (statusCode === 200) {  
                    console.log("BODY:", body);                           
                    characterId = body._id;
                    console.log(`The id is: ${characterId}`);
                    console.log(`Got the name, giving to API: ${postdata}`);   
                    //insert the characterid, now that we know it
                    postdata.character = characterId;                                          
                    requestOptions = {
                        url: `${apiOptions.server}${path}`,                     
                        method: 'POST',                                         
                        json: postdata                                          
                    };
                    request(                                                  
                        requestOptions,
                        (err, {statusCode}, body) => {
                        if (statusCode === 201) {                            
                                //Set the lockdown so they match up
                                requestOptions = {
                                    url: `${apiOptions.server}/api/users/6627e3747ca08ee65e7f8ec5/characters/${characterId}/newlockdown`,                     
                                    method: 'PUT',                                         
                                    json: {lockdown: body._id}                                          
                                };
                                console.log(JSON.stringify(requestOptions)); 
                                request(
                                    requestOptions,
                                    (err, {statusCode}, body) => {
                                        if (statusCode === 200) {
                                            res.redirect(`/users/${userid}/characters/`); 
                                        } else if (err) {
                                            res
                                                .status(200)
                                                .json(err);
                                        }
                                    }
                                );

                            } else {                                              
                                showError(req, res, statusCode);                    
                            }
                        }
                    );
            } else {  
                console.log("ERROR:", err);                                            
                res
                    .status(statusCode)
                    .json(err);                    
            }
        }
    );
}

/* GET 'Add lockdown' page */
const addLockdown = (req, res) => {
    res.render('character-lockdown-new-form', {title : 'Add Lockdown'});
};

const doAddCharacter = (req, res) => {
    const userid = req.params.userid;                
    const path = `/api/users/${userid}/characters/`; 
    console.log(req.body);     
    const postdata = {                                        
        name: req.body.characterName,                                  
        className: req.body.className,
        hp: req.body.hp, maxhp: req.body.hp,
        body: req.body.body, mind: req.body.mind, spirit: req.body.spirit, 
        abilities: req.body.abilities, 
        magicItems: req.body.magicItems, 
        notes: req.body.flavorText,
        lockdown: ""                  
    };           
    console.log(`Giving to API: ${postdata}`);                                             
    const requestOptions = {
        url: `${apiOptions.server}${path}`,                     
        method: 'POST',                                         
        json: postdata                                          
    };
    request(                                                  
        requestOptions,
        (err, {statusCode}, body) => {
        if (statusCode === 201) {                             
                res.redirect(`/users/${userid}/characters/`);            
            } else {                                              
                showError(req, res, statusCode);                    
            }
        }
    );
};

/* Get 'Add character' page */
const addCharacter = (req, res) => {
    res.render('character-add-character-form', {title: 'Add Character'});
};


module.exports = {
    characterlist,
    characterInfo,
    lockoutCalendar,
    doAddLockdown,
    addLockdown,
    addCharacter,
    doAddCharacter
}