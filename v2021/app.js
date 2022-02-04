const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const flash = require("connect-flash");
app.use(flash());
/* dotenv */
const dotenv = require('dotenv');
dotenv.config({path: "./config/config.env"});
/* VİEW ENGİNE */
app.set("views", path.join(__dirname, "./views"));
const exphbs = require('express-handlebars');
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
/* Routers */
const indexRouter = require('./routes/index');
const notesRouter = require('./routes/note');
// mongodb connection
const connectDatabase = require('./helper/db');
connectDatabase();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
const {isAuthenticated} =  require("./middleware/isAuthenticated");
app.use(isAuthenticated);
app.use('/', notesRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({err});
});

module.exports = app;
