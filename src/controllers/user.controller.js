const User = require("../models/User");
const passport = require('passport')

const userController = {};

userController.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

userController.signup = async(req, res) => {
    const errors = [];
    const { username, password, confirm_password } = req.body;
    // Comprobaciones
    if (password != confirm_password) {
        errors.push({
            text: 'Passwords do not match!'
        });
    }
    if (password.length < 5) {
        errors.push({
            text: 'Password must be at least 6 characters!'
        });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors
        });
    } else {
        const usernameT = await User.findOne({ username: username });
        if (usernameT) {
            req.flash('error_msg', 'This username is already in use.');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({
                username,
                password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'User registered successfully!');
            res.redirect('/users/signin');
        }
    }
};

userController.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

userController.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/',
    failureFlash: true
});

userController.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now!');
    res.redirect('/users/signin');
};

module.exports = userController;