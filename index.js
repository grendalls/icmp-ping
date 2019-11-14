const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const sequelizeStore = require("express-session-sequelize")(session.Store);

const app = express();

app.use(morgan("combined"));

const userRouter = require("./routes/user");
const deviceRouter = require("./routes/device");
const db = require("./database");

const sessionStore = new sequelizeStore({ db });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
require("./passport")(passport);
app.use(passport.session());

app.use(userRouter);
app.use(deviceRouter);

const port = process.env.PORT || 4000;

db.authenticate()
  .then(() => console.log("Connected to Postgres DB"))
  .catch(err => console.log(err.message));

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
