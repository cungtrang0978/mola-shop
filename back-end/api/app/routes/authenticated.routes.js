const express = require('express');
const router = express.Router();

const userMiddleware = require('../middleware/user.middleware');
const Authenticated = require('../controllers/authenticeted.controllers');

router.post('/login', userMiddleware.validateLogin, Authenticated.login);
router.post('/forgot-password', userMiddleware.vadidateEmail, Authenticated.forgotPassword)
module.exports = router;