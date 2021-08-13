const express = require('express');
const router = express.Router();
const blogsRoutes = require('./blog');
const userRoutes = require('./user');

router.use('/user', userRoutes);
router.use('/blog', blogsRoutes);

module.exports = router;
