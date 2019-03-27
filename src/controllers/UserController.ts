import { User, DTOUser } from "../models/UserModel";
import * as jwt from "jsonwebtoken";
import * as passport from 'passport'
// import { configuration } from "../passport/index";
import * as UserHelper from '../helpers/DTOUserHelper';
import { Recipe } from '../models/RecipeModel';
import * as RecipeHelper from '../helpers/DTORecipeHelper';

import config from '../config/config'
import '../middlewares/passport'

export async function registerUser(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(403).json({ message: 'Unable to register user' });
    }
    let user = await User.findOne({ email })

    if (user) {
      return res.status(403).json({ message: 'Unable to register user' });
    }
    
    user = new User({ email, password });
    await user.save()
    res.status(200).json({ message: "Successfully created new user." })

  } catch (err) {
    res.status(403).json({ message: 'Unable to register user' });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    const DTOUsers = UserHelper.toModel(users);
    res.json(DTOUsers);
  } catch(err) {
    res.json('Oops..., something went wrong ')
  }
}

export async function getUserbyID(req, res) {
  const { id }  = req.body
  try {
    const user = await User.findOne({ _id: id })
    res.json({ user })
  } catch(err) {
    res.status(500).json(err)
  }
}

export async function getUserByEmail(req, res) {
  const { email }  = req.body
  try {
    const user = await User.findOne({ email })
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
        const body = { _id: user._id, email: user.email, username: user.username };
        // JWT options
        const options = {
          expiresIn: '24h'
        }
        // Sign the JWT token and populate the payload with the body
        const token = jwt.sign({ user: body }, config.jwt.secretOrKey, options);
        // Send back the token to the user
        return res.json({ user, token, message: 'Login successful' });
      });
    } catch (error) {
      return res.status(500).json({message: 'Error login in, check your email and password'});
    }
  })(req, res, next);
}
