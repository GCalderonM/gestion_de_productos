const { Router } = require('express');
const router = Router();

const { renderSignUpForm, signup, renderSignInForm, signin, logout } = require('../controllers/user.controller');

// Crear un nuevo usuario
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signup);

// Logear un usuario
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', signin);

// Logout del usuario
router.get('/users/logout', logout);

module.exports = router;