import { User, DTOUser } from "../models/user";
import * as jwt from "jsonwebtoken";
import { configuration } from "../passport/index";
import * as UserHelper from '../helpers/DTOUserHelper';
import { Recipe } from '../models/recipe';
import * as RecipeHelper from '../helpers/DTORecipeHelper';

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
      const DTOUsers = UserHelper.toModel(users);
      resolve(DTOUsers);
    })
    .catch((err) => {
      rejects(err);
    })
  }); 
}

export function getUserByEmail(userEmail) {
 

  return new Promise( (resolve, rejects) => {
    if(userEmail != 'user@gmail.com') {
      rejects('Invalid User')
    }
    User.find({email: userEmail}).then((user) => {
      const userModel = UserHelper.toModel(user);
      resolve(userModel);
    })
    .catch((err) => rejects(err));
  });
}
export function getUser(userId) {
  return new Promise ((resolve, rejects) => {
    let userInformation;
    User.find({_id: userId}).then((user) => {
      const userModel = UserHelper.toModel(user);
      Recipe.find({owner_id: userId}).then((recipes) => {
        const modelRecipes = RecipeHelper.toModelArray(recipes);
        userInformation = {
          ...userModel,
          recipes: modelRecipes
        };
        resolve(userInformation);
      })
      .catch((err) => {
        rejects(err);
      });
    })
    .catch((err) => {
      rejects(err);
    });
  });
}

export function deleteUser(userId) {
  return new Promise((resolve, rejects) =>  {
    User.findByIdAndDelete(userId).then(() => {
      resolve('User deletes with succesfull')
    })
    .catch((err) => { rejects(err)
    });
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
