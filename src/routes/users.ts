import * as express from 'express';
import * as passport from 'passport';
import {User} from '../models/user';
import {registerUser, getAllUsers, userAuthentication} from '../controllers/UserController';

const router = express.Router();

router.post('/register', (req: express.Request, res: express.Response) => { 
  registerUser(req.body).then(message => {res.send(message)})
                        .catch(err => { res.status(500).send(err)});
});

router.get('/', (req: express.Request, res: express.Response) => {
  getAllUsers().then((users) => {res.json(users)})
              .catch((err) => {res.status(500).send(err)});
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/auth', (req: express.Request, res: express.Response) => {
  userAuthentication(req.body).then((user) => { res.json(user)})
                              .catch((err) => {res.status(500).send(err)});
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
  
  
  export = router;