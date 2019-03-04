import * as express from 'express';
import * as passport from 'passport';
import {User} from '../models/user';
import { registerUser, getAllUsers, loginUser, getUserbyID, deleteUser, getUserByEmail } from '../controllers/UserController';

const router = express.Router();

router.post('/register', registerUser);

router.get('/find-by-email', getUserByEmail);

router.get('/find-by-id', getUserbyID);

router.delete('/delete', deleteUser);

router.get('/get-all', getAllUsers);

// Auth with JWT
router.post('/login', loginUser)
  
  export = router;