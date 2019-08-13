const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('./../controllers/user');

router.post('/login', UserController.login);

router.post('/register', UserController.register);

router.post('/token', passport.authenticate('jwt', {session: false}), UserController.token);

module.exports = router;
