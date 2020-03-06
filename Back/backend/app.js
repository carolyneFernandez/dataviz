var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


/*
DB_SETTING : paramètre de connection à la bdd (/!\ A changer en fonction du dockercompose)
*/
const DB_SETTINGS = {
    DB_NAME: 'db_dataviz',
    DB_USERNAME: 'dataviz',
    DB_PASSWORD: 'dataviz',
    DB_HOST: 'localhost',
    DB_DIALECT: 'mysql'
}
const sequelize = new Sequelize(
    DB_SETTINGS.DB_NAME,
    DB_SETTINGS.DB_USERNAME,
    DB_SETTINGS.DB_PASSWORD, {
        host: DB_SETTINGS.DB_HOST,
        dialect: DB_SETTINGS.DB_DIALECT /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    });

// test de la connection (code donnée par sequelize doc (BUG A REGLER))

try {
    sequelize.authenticate();
    console.log("Connection to database succeed.");
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;