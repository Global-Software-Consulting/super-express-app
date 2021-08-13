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
        //   console.log(token);
        return res.json({ token });
      }
    );
  } catch (error) {
    return apiResponse(res, 500, error.message);
  }
}

exports.signup = async (req, res) => {
  let { password, email } = req.body;
  console.log('in signup');
  if (!password) {
    return apiResponse(res, 404, 'password is required');
  }
  try {
    if (email) {
      email = email.toLowerCase();
      const alreadyUser = await User.findOne({
        where: { email: email },
      });
      if (alreadyUser) {
        return apiResponse(res, 400, 'This email already exists');
      }
    }

    let user = await User.create(req.body);
    user = JSON.parse(JSON.stringify(user));
    return apiResponse(res, 201, 'Registered Successfully', user);
  } catch (err) {
    return apiResponse(res, 500, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    // Check if email and password exists...
    if (!email || !password) {
      return apiResponse(res, 404, 'Password or email missing');
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
    console.log(user.password);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return apiResponse(res, 404, 'incorrect password');
    }
    console.log(user.email);
    generateJWT(user, res);
  } catch (error) {
    return apiResponse(res, 500, error.message);
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

exports.getLoggedInUser = async (req, res) => {
  try {
    console.log(req.user, 'request user');
    const user = await User.findOne({ where: { id: req.user.id } });
    return apiResponse(res, 200, 'Logged in user', user);
  } catch (err) {
    return apiResponse(res, 500, err.message);
  }
};

exports.changeUserStatus = async (req, res) => {
  try {
    if (!req.params.id) {
      return apiResponse(res, 400, 'enter user id');
    }
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return apiResponse(res, 404, 'No user found with this id');
    }
    let status = 'blocked';
    if (user.status == 'blocked') {
      status = 'active';
    }
    await User.update(
      {
        status,
      },
      {
        where: { id: req.params.id },
      }
    );
    return apiResponse(res, 200, `user account ${status} successfully`);
  } catch (err) {
    return apiResponse(res, 500, err.message);
  }
};

exports.updateProfilePic = async (req, res, next) => {
  try {
    if (req.user.id == req.params.userId) {
      if (req.file) req.body.profilePicture = req.file.filename;
      if (!req.body.profilePicture) {
        return apiResponse(res, 400, 'must select a picture');
      }

      const user = await User.update(
        {
          profilePicture: req.body.profilePicture,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      if (user[0] == 0) {
        return apiResponse(res, 'error', 'No user found with this id', 404);
      }
      return apiResponse(
        res,
        200,
        'Profile picture updated successfully',
        user[0]
      );
    } else {
      return apiResponse(
        res,
        401,
        'You are not authorize to perform this action'
      );
    }
  } catch (error) {
    return apiResponse(res, 500, error.message);
  }
};
