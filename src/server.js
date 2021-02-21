const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const helpers = require('handlebars-helpers');

// Inicializaciones
const app = express();
require('./config/passport');

// Settings - Configuraciones para express
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: {
        ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }
}));
app.set('view engine', '.hbs');

// Middlewares - Se van ejecutando en medida que le llegan request al servidor
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());

// Global variables - Variables globales, es decir, toda la all las pueden utilizar
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes - Rutas que manejara nuestra api
app.use(require('./routes/index.routes'));
app.use(require('./routes/products.routes'));
app.use(require('./routes/user.routes'));

// Static files - Configuracion del directorio public
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;