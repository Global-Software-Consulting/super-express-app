const express = require('express');
const router = express.Router();
const { blogController } = require('../controllers');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');

router.post('/', auth, checkRole('admin', 'editor'), blogController.add);
router.patch('/:id', auth, checkRole('admin', 'editor'), blogController.update);
router.delete(
  '/:id',
  auth,
  checkRole('admin', 'editor'),
  blogController.delete
);
router.get('/editor/:id', blogController.editorBlogs);

router.get('/:id', blogController.getById);
router.get('/', blogController.getAll);
module.exports = router;
