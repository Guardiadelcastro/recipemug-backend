import * as express from 'express';
import * as passport from 'passport';
import {User} from '../models/user';
import {registerUser, getAllUsers, userAuthentication, getUser, deleteUser, getUserByEmail} from '../controllers/UserController';

const router = express.Router();

router.post('/register', (req: express.Request, res: express.Response) => { 
  registerUser(req.body).then(message => {res.send(message)})
                        .catch(err => { res.status(500).send(err)});
});

router.get('/email/:email', (req: express.Request, res: express.Response) => {
  getUserByEmail(req.params.email).then((user) => res.json(user))
                                  .catch((err) => res.status(500).send(err));
});
router.get('/:id', (req: express.Request, res: express.Response) => {
  getUser(req.params.id).then((user) => res.json(user))
                        .catch((err) => res.status(500).send(err));
});

router.delete('/:id', (req: express.Request, res: express.Response) => {
  deleteUser(req.params.id).then((message) => res.send(message))
                           .catch((err) => res.status(500).send(err));
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