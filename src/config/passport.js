const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'username'
}, async(username, password, done) => {
    // Comprobamos que el nombre del usuario existe en la bd
    const user = await User.findOne({ username: username }).lean();
    if (!user) {
        return done(null, false, { message: 'Not user found with that username!' });
    } else {
        // Ahora validamos la contraseña
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password!' });
        }
    }
}));

// Los guardamos en la session del cliente web
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Cuando navegemos, con este metodo le haremos sacer que tiene acceso a las rutas
passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
        done(err, user);
    });
});