const router = require("express").Router();
const passport = require("passport");
const registerValidate = require("../validation/register");
const loginValidate = require("../validation/login");
const User = require("../database/models/User");
const bcrypt = require("bcryptjs");
const isRequestBodyEmpty = require("../middlewares").isRequestBodyEmpty;
const updatePk = require("../helpers").updatePk;

router.get("/test", (req, res) => {
  res.json(req.session);
});

router.post("/login", isRequestBodyEmpty, (req, res, next) => {
  const { errors, isValid } = loginValidate(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        res.status(400).json(err);
      }
      if (user) {
        req.logIn(user, err => {
          if (!err) {
            res.status(200).json({ isLoggedIn: true });
          } else {
            res.status(401).json(err);
          }
        });
      } else {
        res.status(401).json({ isLoggedIn: false });
      }
    })(req, res, next);
  }
});

router.post("/register", isRequestBodyEmpty, (req, res) => {
  console.log(req.body);
  const { errors, isValid } = registerValidate(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    const { email, password, name } = req.body;

    User.findOne({
      where: {
        email
      }
    }).then(user => {
      if (user) {
        errors.email = "Email already exist";
        res.status(404).json(errors);
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
              .then(user => res.status(200).json({ isAuth: true }))
              .catch(err => console.log(err));
            updatePk(User);
          });
        });
      }
    });
  }
});

module.exports = router;
