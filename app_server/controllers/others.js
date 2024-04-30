/* GET about page */
const about = (req, res) => {
    res.render('about', 
        {
            title: 'About 1 to 1 Time Tracker',
            aboutContent: '1-to-1 Time Tracker was created by Taylor Fernald and Logan Richardson. \n\n\
            This website showcases what we have learned in Dr. Fenwick\'s grad MEAN web Dev.',
        }
    );
};

module.exports = {
    about
};