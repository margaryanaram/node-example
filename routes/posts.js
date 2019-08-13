const express = require('express');
const router = express.Router();
const brute = require('./../helpers/brute');
const passport = require('passport');
const PostController = require('./../controllers/post');

router.get('/:id?', brute.prevent, passport.authenticate('jwt', {session: false}), PostController.get);

router.post('/', brute.prevent, passport.authenticate('jwt', {session: false}), PostController.create);

router.put('/:id', brute.prevent, passport.authenticate('jwt', {session: false}), PostController.update);

router.delete('/:id', brute.prevent, passport.authenticate('jwt', {session: false}), PostController.delete);

module.exports = router;
