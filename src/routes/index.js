const express = require('express');
const router = express.Router();
const blogsRoutes = require('./blog');
const userRoutes = require('./user');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Apis running successfully',
  });
});
router.use('/user', userRoutes);
router.use('/blog', blogsRoutes);

module.exports = router;
