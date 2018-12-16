import * as express from 'express';
import * as path from 'path';
//import * as favicon from 'serve-favicon';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

//initializations
import {connect} from 'mongoose';
import * as passport from 'passport';
import {configuration} from './passport/index';
import * as routes from './routes/index';
import * as users from './routes/users';
import * as recipes from './routes/recipes';
import {addUserId} from './passport/passport';
const app = express();


//connet to db

connect('mongodb://mongo:27017/Apiuser20').then(() => {
  console.log('connected')
})
.catch((err) => {
  console.log(err);
});


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
addUserId(passport);


// routes

app.use('/recipes', recipes);
app.use('/users', users);
app.use('/home', routes);
app.get('/favicon.ico', (req, res ) => {
  res.send('');
});

// catch 404 and forward to error handler

class MyError extends Error {  

  private status: number;
  constructor(message: string, status: number=500) {
    super(message);
    this.status;
  }
  getStatus() {
    return this.status;
  }
}

app.use(function(req, res, next) {

var err = new MyError('Not Found', 404);
  next(err);
});
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
app.use(function(err: MyError|Error, req, res, next) {
  if(err instanceof MyError) {
    res.status(err.getStatus());
  } else {
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