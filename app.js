const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const expressHbs = require ("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const validator = require("express-validator");
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://localhost:27017/shopping");
require("./config/passport");

// view engine setup
app.engine(".hbs", expressHbs({defaultLayout: "layout", extname: ".hbs"}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({secret: "mySecretSession", resave: false, saveUninitialized: false}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
