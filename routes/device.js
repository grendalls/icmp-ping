const router = require("express").Router();
const authenticationMiddleware = require("../middlewares");
const Device = require("./");

router.get("/devices", authenticationMiddleware, (req, res) => {
  res.status(200).json({ devices: true });
});

module.exports = router;
