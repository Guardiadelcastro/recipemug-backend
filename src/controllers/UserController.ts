import { User, DTOUser } from "../models/UserModel";
import * as jwt from "jsonwebtoken";
import * as passport from 'passport'
// import { configuration } from "../passport/index";
import { toModel } from '../helpers/DTOUserHelper';


import config from '../config/config'
import '../middlewares/passport'

export async function registerUser(req, res) {
  try {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
      return res.status(403).json({ message: 'Unable to register user' });
    }
    let user = await User.findOne({ email })

    if (user) {
      return res.status(403).json({ message: 'Unable to register user' });
    }
    
    user = new User({ email, password, username });
    await user.save()
    res.status(200).json({ message: "Successfully created new user." })

  } catch (err) {
    res.status(403).json({ message: 'Unable to register user' });
  }
}

export async function getUserbyID(req, res) {
  const { id }  = req.body
  try {
    const user = await User.findOne({ _id: id }, {_id: 0, _v: 0, password: 0})

    res.json(user)
  } catch(err) {
    res.status(500).json(err)
  }
}

export async function getUserByEmail(req, res) {
  const { email }  = req.body
  try {
    const user = await User.findOne({ email }, {_id: 0, _v: 0, password: 0})
    res.json({ user })
  } catch(err) {
    res.status(500).json(err)
  }
}
export async function getUserByUsername(req, res) {
  const { username }  = req.body
  try {
    const user = await User.findOne({ username }, {_id: 0, _v: 0, password: 0})
    res.json({ user })
  } catch(err) {
    res.status(500).json(err)
  }
}

export async function deleteUser(req, res) {
  const{ id } = req.body
  try {
    await User.findByIdAndDelete({ _id: id })
    res.json('User Deleted')
  } catch(err) {
    res.json('Unable to delete user')
  }
}

export async function loginUser (req, res, next) {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if(err || !user){
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) {return next(error)}
        // Token Body
        const body = { email: user.email, username: user.username };
        // JWT options
        const options = {
          expiresIn: '24h'
        }
        // Sign the JWT token and populate the payload with the body
        const token = jwt.sign({ user: body }, config.jwt.secretOrKey, options);
        // Send back the token to the user
        const userModel = {
          ...user.toObject()
        }
        delete userModel['_id'];
        delete userModel['_v'];
        delete userModel['password'];
        return res.json({ userModel, token, message: 'Login successful' });
      });
    } catch (error) {
      return res.status(500).json({message: 'Error login in, check your email and password'});
    }
  })(req, res, next);
}
