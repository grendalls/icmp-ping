const router = require('express').Router();

router.get('/login', (req, res) => {
  req.session.isLoggedIn = true;
  res.send('Works');
});

module.exports = router;
