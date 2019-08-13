const express = require('express');
const router = express.Router();

// routes
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

module.exports = router;
