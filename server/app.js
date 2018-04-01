const express        = require("express");
const path           = require("path");
const favicon        = require("serve-favicon");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const cors           = require("cors");
const session        = require("express-session");
const passport       = require("passport");

const auth           = require("./routes/auth");
const user           = require("./routes/user");
const car            = require("./routes/car");
const parking        = require("./routes/parking");
const order          = require("./routes/order");

const app            = express();


// Mongoose configuration
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mycar")
  .then(console.log("Connected to DB!!"))

// Session


var corsOptions = {
  origin: true,
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "lab-angular-authentication",
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true, maxAge: 2419200000 }
}));

// Passport configuration
require("./config/passport")(passport,app);


app.use('/api', auth);
app.use('/api/user', user);
app.use('/api/car', car);
app.use('/api/parking', parking);
app.use('/api/order', order);

app.all('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;
