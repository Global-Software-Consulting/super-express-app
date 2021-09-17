const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const apiResponse = require('../utils/apiResponse');
// const sequelize = db.sequelize;

function generateJWT(user, res) {
  try {
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: 360000 },
      (error, token) => {
        if (error) throw error;
        return res.json({ token });
      }
    );
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
}

exports.signup = async (req, res) => {
  let { password, email } = req.body;
  if (!password) {
    return apiResponse(res, 404, false, 'password is required');
  }
  try {
    if (email) {
      email = email.toLowerCase();
      const alreadyUser = await User.findOne({
        where: { email: email },
      });
      if (alreadyUser) {
        return apiResponse(res, 400, false, 'This email already exists');
      }
    }

    let user = await User.create(req.body);
    user = JSON.parse(JSON.stringify(user));
    return apiResponse(res, 201, true, 'Registered Successfully', user);
  } catch (err) {
    return apiResponse(res, 500, false, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    // Check if email and password exists...
    if (!email || !password) {
      return apiResponse(res, 404, false, 'Password or email missing');
    }

    //Get User from database
    email = email.toLowerCase();
    const user = await User.findOne({
      where: {
        email: email,
        status: 'active',
      },
    });
    if (!user) {
      return apiResponse(res, 404, 'No active user with this email');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return apiResponse(res, 404, false, 'incorrect password');
    }
    generateJWT(user, res);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// exports.deleteAccount = async (req, res) => {
//   //Check if user exists...
//   const user = await User.findOne({ where: { id: req.user.id } });
//   if (!user) {
//     return res
//       .status(404)
//       .json({ status: 'Failed', message: 'User not found' });
//   }
//   User
//     .destroy({ where: { id: req.user.id } })
//     .then(() => {
//       res
//         .status(200)
//         .json({ status: 'Success', message: 'Account deleted successfully' });
//     })
//     .catch((err) => {
//       res.status(400).json({ status: 'Failed', Error: err.message });
//     });
// };
// exports.updateUser = async (req, res) => {
//   const user = await User.findOne({ where: { id: req.user.id } });
//   if (!user) {
//     return res
//       .status(404)
//       .json({ status: 'Failed', message: 'User not found' });
//   }
//   User
//     .update(req.body, { where: { id: req.user.id } })
//     .then((newUser) => {
//       res.status(200).json({
//         status: 'Success',
//         message: 'User updated successfully',
//       });
//     })
//     .catch((err) => {
//       res.status(400).json({ status: 'Failed', error: err.message });
//     });
// };

exports.me = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    return apiResponse(res, 200, true, 'Logged in user', user);
  } catch (err) {
    return apiResponse(res, 500, false, err.message);
  }
};

exports.user = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return apiResponse(res, 400, false, 'user id missing');
    }
    const user = await User.findOne({ where: { id: userId } });
    return apiResponse(res, 200, true, ' user', user);
  } catch (err) {
    return apiResponse(res, 500, false, err.message);
  }
};

exports.all = async (req, res) => {
  try {
    const users = await User.findAll({});
    return apiResponse(res, 200, true, ' user', users);
  } catch (err) {
    return apiResponse(res, 500, false, err.message);
  }
};

exports.changeUserStatus = async (req, res) => {
  try {
    if (!req.params.id) {
      return apiResponse(res, 400, false, 'enter user id');
    }
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return apiResponse(res, 404, false, 'No user found with this id');
    }
    let status = 'blocked';
    if (user.status == 'blocked') {
      status = 'active';
    }
    await user.update({
      status,
    });
    return apiResponse(res, 200, true, `user account ${status} successfully`);
  } catch (err) {
    return apiResponse(res, 500, false, err.message);
  }
};

exports.updateProfilePic = async (req, res) => {
  try {
    if (req.user.id == req.params.userId) {
      if (req.file) req.body.profilePicture = req.file.filename;
      if (!req.body.profilePicture) {
        return apiResponse(res, 400, false, 'must select a picture');
      }
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return apiResponse(res, 404, false, 'No user found with this id');
      }
      await user.update({
        profilePicture: req.body.profilePicture,
      });
      return apiResponse(
        res,
        200,
        true,
        'Profile picture updated successfully',
        user
      );
    } else {
      return apiResponse(
        res,
        401,
        false,
        'You are not authorize to perform this action'
      );
    }
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
