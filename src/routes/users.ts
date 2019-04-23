import * as express from 'express';
import { registerUser, loginUser, getUserbyID, deleteUser, getUserByEmail, getUserByUsername, updateUser } from '../controllers/UserController';
// import { isAuth } from '../middlewares/auth'
// TODO: Add protection to user routes
const router = express.Router();

router.get('/find/:username', getUserByUsername);

router.post('/register', registerUser);

router.put('/update', updateUser);

router.delete('/delete', deleteUser);

// Auth with JWT
router.post('/login', loginUser)
  
  export = router;