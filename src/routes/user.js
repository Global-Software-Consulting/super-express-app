const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user');
const { checkRole } = require('../middleware/roles');
const fileUpload = require('../middleware/fileUpload');

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.patch(
  '/profileImage/:userId',
  auth,
  function (req, res, next) {
    req.type = 'image';
    next();
  },
  fileUpload('uploads/user/profileImages/profileImage').single(
    'profilePicture'
  ),

  userController.updateProfilePic
);
router.get('/', auth, userController.getLoggedInUser);
router.patch(
  '/updateStatus/:id',
  auth,
  checkRole('admin'),
  userController.changeUserStatus
);

module.exports = router;
