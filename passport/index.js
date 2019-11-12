const localStrategy = require('passport-local').Strategy;
const User = require('../database/models/User');
const bcrypt = require('bcryptjs');

const localOptions = {
  usernameField: 'email'
};

module.exports = passport => {
  passport.use(
    new localStrategy(localOptions, (email, password, done) => {
      User.findOne({
        where: {
          email: email
        }
      })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          bcrypt
            .compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                done(null, user, { message: 'Success' });
              } else {
                done(null, false, { message: "Passwords don't match" });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => done(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
