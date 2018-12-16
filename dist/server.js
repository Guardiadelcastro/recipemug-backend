"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
//import * as favicon from 'serve-favicon';
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//initializations
const mongoose_1 = require("mongoose");
const passport = require("passport");
const index_1 = require("./passport/index");
const routes = require("./routes/index");
const users = require("./routes/users");
const recipes = require("./routes/recipes");
const passport_1 = require("./passport/passport");
const app = express();
//connet to db
mongoose_1.connect(index_1.configuration.database.local);
// settings
app.set('port', process.env.PORT || 3000);
// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//init passport
app.use(passport.initialize());
passport_1.addUserId(passport);
// routes
app.use('/recipes', recipes);
app.use('/users', users);
app.use('/home', routes);
// catch 404 and forward to error handler
class MyError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status;
    }
    getStatus() {
        return this.status;
    }
}
app.use(function (req, res, next) {
    var err = new MyError('Not Found', 404);
    next(err);
});
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    if (err instanceof MyError) {
        res.status(err.getStatus());
    }
    else {
        res.status(500);
    }
    res.render('error', {
        message: err.message,
        error: {}
    });
});
// Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
//# sourceMappingURL=server.js.map