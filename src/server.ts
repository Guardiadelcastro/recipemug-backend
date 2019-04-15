import * as express from 'express';
import * as passport from 'passport';
import { connect } from 'mongoose';
import * as path from 'path';
import * as morgan from 'morgan';
// import * as cors from 'cors';
import * as helmet from 'helmet';
// import * as favicon from 'serve-favicon';

import config from './config/config'
import * as users from './routes/users';
import * as recipes from './routes/recipes';

// Init Express app
const app = express();
// Connect to DB
connect(config.mongodb.URI, config.mongodb.options)
      .then(() => console.log(`MongoDB is connected...`))
      .catch(err => console.error(`MongoDB connection unsccessfull due to error: ${err}`));

app.set('port', process.env.PORT || 3000);

// middlewares
// app.use(cors(config.cors));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// routes
app.get('/', (req, res) => res.send('Welcome to the recipemug api'));
app.use('/api/recipes', recipes);
app.use('/users', users);

// app.get('/favicon.ico', (req, res ) => {
//   res.send('');
// });

// catch 404 and forward to error handler

app.use((req, res, next) => {
  const error: any = new Error('Not found');
  error.status = 404;
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  })
})

// Starting the server
app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));