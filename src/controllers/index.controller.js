const indexController = {};

indexController.renderIndex = (req, res) => {
    if (res.locals.user) {
        res.render('index', {
            currentUsername: res.locals.user.username
        });
    } else {
        res.render('index');
    }
};

indexController.renderAbout = (req, res) => {
    if (res.locals.user) {
        res.render('about', {
            currentUsername: res.locals.user.username
        });
    } else {
        res.render('about');
    }
};

module.exports = indexController;