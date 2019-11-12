const expess = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const sequelizeStore = require('express-session-sequelize')(session.Store);

const app = expess();

const userRouter = require('./routes/user');
const deviceRouter = require('./routes/device');
const db = require('./database');

const sessionStore = new sequelizeStore({ db });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
require('./passport')(passport);
app.use(passport.session());

app.use(userRouter);
app.use(deviceRouter);

const port = process.env.PORT || 4000;

db.authenticate()
  .then(() => console.log('Connected'))
  .catch(err => console.log(err.message));

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
