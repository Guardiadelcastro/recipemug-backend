import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import {User} from '../models/user';
import {configuration} from '../passport/index';

const router = express.Router();

router.post('/register', function(req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({
        success: false,
        message: 'Please enter email and password.'
      });
    } else {
      let newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
  
newUser.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          message: 'That email address already exists.'
        });
      }
      res.json({
        success: true,
        message: 'Successfully created new user.'
      });
    });
  }
});

router.get('/', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/auth', (req, res) => {
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
  }), function(req: RequestWithUser, res) {
    const user = req.user as any
    res.send('It worked! User id is: ' + user._id + '.');
  });
  
  
  export default router;