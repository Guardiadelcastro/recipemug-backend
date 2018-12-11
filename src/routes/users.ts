import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import {User} from '../models/user';
import {configuration} from '../passport/index';
import {registerUser} from '../controllers/UserController';

const router = express.Router();

router.post('/register',(req: express.Request, res: express.Response) => {registerUser(req.body)});

router.get('/', function(req: express.Request, res: express.Response) {
    User.find({}, function(err, users) {
      res.json(users);
    });
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/auth', (req: express.Request , res: express.Response) => {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.send({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user, configuration
            .auth.secret, {
              expiresIn: "2 days"
            });
            res.json({
              success: true,
              message: 'Authentication successfull',
              token
            });
          } else {
            res.send({
              success: false,
              message: 'Authentication failed. Passwords did not match.'
            });
          }
        });
      }
    });
  });
  
  // Example of required auth: protect dashboard route with JWT

  interface RequestWithUser extends express.Request {
    user: typeof User
  }

  router.get('/dashboard', passport.authenticate('jwt', {
    session: false
  }), function(req: RequestWithUser, res: express.Response) {
    const user = req.user as any
    res.send('It worked! User id is: ' + user._id + '.');
  });
  
  
  export default router;