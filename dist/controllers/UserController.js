"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jwt = require("jsonwebtoken");
const index_1 = require("../passport/index");
const UserHelper = require("../helpers/DTOUserHelper");
const recipe_1 = require("../models/recipe");
const RecipeHelper = require("../helpers/DTORecipeHelper");
function registerUser(user) {
    return new Promise((resolve, reject) => {
        if (!user.email || !user.password) {
            const error = ({
                success: false,
                message: "Please enter email and password."
            });
            reject(error);
        }
        else {
            let newUser = new user_1.User({
                email: user.email,
                password: user.password
            });
            newUser.save().then(() => {
                const success = {
                    success: true,
                    message: "Successfully created new user."
                };
                resolve(success);
            })
                .catch(() => {
                const error = {
                    success: false,
                    message: "That email address already exists."
                };
                reject(error);
            });
        }
    });
}
exports.registerUser = registerUser;
function getAllUsers() {
    return new Promise((resolve, rejects) => {
        user_1.User.find({}).then((users) => {
            const DTOUsers = UserHelper.toModel(users);
            resolve(DTOUsers);
        })
            .catch((err) => {
            rejects(err);
        });
    });
}
exports.getAllUsers = getAllUsers;
function getUser(userId) {
    return new Promise((resolve, rejects) => {
        let userInformation;
        user_1.User.find({ _id: userId }).then((user) => {
            const userModel = UserHelper.toModel(user);
            recipe_1.Recipe.find({ owner_id: userId }).then((recipes) => {
                const modelRecipes = RecipeHelper.toModelArray(recipes);
                userInformation = Object.assign({}, userModel, { recipes: modelRecipes });
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
exports.getUser = getUser;
function deleteUser(userId) {
    return new Promise((resolve, rejects) => {
        user_1.User.findByIdAndDelete(userId).then(() => {
            resolve('User deletes with succesfull');
        })
            .catch((err) => {
            rejects(err);
        });
    });
}
exports.deleteUser = deleteUser;
//FUNCION QUE FALLA. 
function userAuthentication(user) {
    return new Promise((resolve, rejects) => {
        user_1.User.findOne({ email: user.email }).then((userToAutenticate) => {
            userToAutenticate.comparePassword(userToAutenticate.password, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log(isMatch);
                    let token = jwt.sign(user, index_1.configuration.auth.secret, {
                        expiresIn: "2 days"
                    });
                    const success = {
                        success: true,
                        message: "Authentication successfull",
                        token
                    };
                    resolve(success);
                }
                else {
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
            };
            rejects(error);
        });
    });
}
exports.userAuthentication = userAuthentication;
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
//# sourceMappingURL=UserController.js.map