import * as express from 'express';
import * as passport from 'passport';
import {User} from '../models/user';
import { registerUser, getAllUsers, loginUser, getUserbyID, deleteUser, getUserByEmail } from '../controllers/UserController';

const router = express.Router();

router.post('/register', registerUser);

router.get('/:email', getUserByEmail);

router.get('/:id', getUserbyID);

router.delete('/:id', deleteUser);

router.get('/', getAllUsers);

// Auth with JWT
router.post('/login', loginUser)
  
  export = router;