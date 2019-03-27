import * as express from 'express';
import { registerUser, loginUser, getUserbyID, deleteUser, getUserByEmail } from '../controllers/UserController';

const router = express.Router();

router.post('/register', registerUser);

router.get('/find-by-email', getUserByEmail);

router.get('/find-by-id', getUserbyID);

router.delete('/delete', deleteUser);

// Auth with JWT
router.post('/login', loginUser)
  
  export = router;