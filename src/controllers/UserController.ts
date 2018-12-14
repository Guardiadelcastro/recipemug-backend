import { User, DTOUser } from "../models/user";
import * as jwt from "jsonwebtoken";
import { configuration } from "../passport/index";
import * as UserHelper from '../helpers/DTOUserHelper';

export function registerUser(user: DTOUser) {
  return new Promise ((resolve, reject) => {
    if (!user.email || !user.password) {
      const error = ( {
        success: false,
        message: "Please enter email and password."
      });
      reject(error);
    } else {
      let newUser = new User({
        email: user.email,
        password: user.password
      });
  
      newUser.save().then(() => { 
        const success = {
          success: true,
          message: "Successfully created new user."
        }
        resolve(success);
      })
      .catch(() => { 
        const error = {
          success: false,
          message: "That email address already exists."
        }
        reject(error);
      });
    }
  });
}
 

export function getAllUsers() {
  return new Promise<DTOUser[]> ((resolve, rejects) => {
    User.find({}).then((users) => {
      const DTOUsers = UserHelper.toModelArray(users);
      resolve(DTOUsers);
    })
    .catch((err) => {
      rejects(err);
    })
  }); 
}

//FUNCION QUE FALLA. 
export function userAuthentication(user: DTOUser) {
  return new Promise ((resolve, rejects) => {
    User.findOne({ email: user.email }).then((userToAutenticate) => {
      userToAutenticate.comparePassword(userToAutenticate.password, function(err, isMatch) {
        if (isMatch && !err) {
          console.log(isMatch);
          let token = jwt.sign(user, configuration.auth.secret, {
            expiresIn: "2 days"
          });
          const success = {
            success: true,
            message: "Authentication successfull",
            token
          }
          resolve(success);
        } else {
          console.log(isMatch);
          const error = {
            success: false,
            message: "Authentication failed. Passwords did not match."
          };
          rejects(error);
        }
      });
    })
    .catch(() => {
      const error = {
        success: false,
        message: "Authentication failed. User not found."
      }
      rejects(error);
    });
  });
}


/*
    function(err, user) {
      if (err) throw err;

      if (!user) {
        return {
          success: false,
          message: "Authentication failed. User not found."
        };
      } else {
        // Check if password matches
        user.comparePassword(user.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            let token = jwt.sign(user, configuration.auth.secret, {
              expiresIn: "2 days"
            });
            return {
              success: true,
              message: "Authentication successfull",
              token
            };
          } else {
            return {
              success: false,
              message: "Authentication failed. Passwords did not match."
            };
          }
        });
      }
    }
    */
