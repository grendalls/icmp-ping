const router = require('express').Router();

router.get('/secret', (req, res) => {
  if (req.session.isLoggedIn === true) {
    res.send('You can see secret page');
  }
  res.redirect('/login');
});

module.exports = router;
