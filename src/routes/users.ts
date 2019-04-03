import * as express from 'express';
import { registerUser, loginUser, getUserbyID, deleteUser, getUserByEmail, getUserByUsername, updateUser } from '../controllers/UserController';
import { isAuth } from '../middlewares/auth'

const router = express.Router();

router.get('/find/email', isAuth, getUserByEmail);

router.get('/find/username', isAuth, getUserByUsername);

router.get('/find/id', isAuth, getUserbyID);

router.post('/register', registerUser);

router.put('/update', isAuth, updateUser);

router.delete('/delete', isAuth, deleteUser);

// Auth with JWT
router.post('/login', loginUser)
  
  export = router;