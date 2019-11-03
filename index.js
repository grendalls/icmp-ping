const expess = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const app = expess();
const userRouter = require('./routes/user');
const secretRouter = require('./routes/secret');
const db = require('./database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
  })
);
app.use(userRouter);
app.use(secretRouter);

const port = process.env.PORT || 3000;

db.authenticate()
  .then(() => console.log('Connected'))
  .catch(err => console.log(err.message));

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
