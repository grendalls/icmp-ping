const router = require('express').Router();
const passport = require('passport');
const registerValidate = require('../validation/register');
const loginValidate = require('../validation/login');
const User = require('../database/models/User');
const bcrypt = require('bcryptjs');

router.get('/test', (req, res) => {
  res.json(req.session);
});

router.post('/login', (req, res, next) => {
  const { errors, isValid } = loginValidate(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        res.json(err);
      }
      if (user) {
        req.logIn(user, err => {
          if (!err) {
            res.status(200).json({ isAuthenticated: true });
          } else {
            res.status(401).json(err);
          }
        });
      } else {
        res.status(401).json({ isAuthenticated: false });
      }
    })(req, res, next);
  }
});

router.post('/register', (req, res) => {
  const { errors, isValid } = registerValidate(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }
  const { email, password, name } = req.body;

  User.findOne({
    where: {
      email
    }
  }).then(user => {
    if (user) {
      errors.email = 'Email already exist';
      res.status(400).json(errors);
    } else {
      const newUser = {
        name,
        email,
        password
      };

      bcrypt.genSalt().then(salt => {
        bcrypt.hash(newUser.password, salt).then(hash => {
          newUser.password = hash;
          User.create(newUser)
            .then(user => res.json({ registrationSuccess: true }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
