import * as express from 'express';
import { registerUser, loginUser, getUserbyID, deleteUser, getUserByEmail, getUserByUsername } from '../controllers/UserController';

const router = express.Router();

router.post('/register', registerUser);

router.get('/find/email', getUserByEmail);

router.get('/find/username', getUserByUsername);

router.get('/find/id', getUserbyID);

router.delete('/delete', deleteUser);

// Auth with JWT
router.post('/login', loginUser)
  
  export = router;