const router = require("express").Router();
const middlewares = require("../middlewares");
const Device = require("../database/models/Device");
const deviceValidate = require("../validation/device");
const updatePk = require("../helpers").updatePk;
const { authenticationMiddleware, isRequestBodyEmpty } = middlewares;

router.get("/devices", authenticationMiddleware, (req, res) => {
  Device.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post(
  "/devices",
  isRequestBodyEmpty,
  authenticationMiddleware,
  (req, res) => {
    const { errors, isValid } = deviceValidate(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const { name, ip } = req.body;

      Device.create({ name, ip })
        .then(data => {
          res.status(200).json({ created: true });
        })
        .catch(err => {
          res.status(400).json({ created: false });
        });
    }
  }
);

router.delete("/devices/:id", authenticationMiddleware, (req, res) => {
  console.log(req.params.id);
  Device.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    updatePk(Device);
    res.status(200).json(data);
  });
});

router.put(
  "/devices/:id",
  isRequestBodyEmpty,
  authenticationMiddleware,
  (req, res) => {
    const { errors, isValid } = req.body;
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const { name, ip } = req.body;
      Device.update(
        { name, ip },
        {
          where: {
            id: req.params.id
          }
        }
      ).then(data => {
        res.status(200).json(data);
      });
    }
  }
);

module.exports = router;
