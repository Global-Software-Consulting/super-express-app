/*eslint-disable*/
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models');
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/v1/social/facebook/callback',
      profileFields: ['id', 'name', 'emails', 'picture.type(large)'],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log({ profile });
      // return done(null);
      User.findOne({ where: { facebookId: profile.id } })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          const name = `${profile.name.givenName}  ${profile.name.familyName}`;
          const newUser = new Users({
            facebookId: profile.id,
            name: name,
            provider: profile.provider,
            email: profile.emails ? profile.emails[0].value : null,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePicture: profile.photos[0].value,
            password: null,
          });
          newUser.save((err, user) => {
            if (err) {
              return done(err, false);
            }

            return done(null, user);
          });
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/v1/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // return done(null);
      Users.findOne({ where: { googleId: profile.id } })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            const name = `${profile.name.givenName}  ${profile.name.familyName}`;
            const newUser = new Users({
              name: name,
              googleId: profile.id,
              provider: profile.provider,
              email: profile.emails ? profile.emails[0].value : null,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              profilePicture: profile.photos[0].value,
              password: null,
            });
            newUser.save((err, user) => {
              if (err) {
                return done(err, false);
              }
              return done(null, user);
            });
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);
