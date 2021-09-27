const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user');
const { checkRole } = require('../middleware/roles');
const fileUpload = require('../middleware/fileUpload');
const { userValidator } = require('../validators');

router.post(
  '/signup',
  userValidator.signUpValidator(),
  userValidator.validate,
  userController.signup
);
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
router.get('/me', auth, userController.me);
router.get('/:id', auth, userController.user);
router.get('/', auth, checkRole('admin'), userController.all);

router.patch(
  '/updateStatus/:id',
  auth,
  checkRole('admin'),
  userController.changeUserStatus
);

// router.get(
//   '/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/',
//     session: false,
//   })
// );
module.exports = router;
