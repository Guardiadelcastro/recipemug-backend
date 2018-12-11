import { User } from "../models/user";
import * as jwt from "jsonwebtoken";
import { configuration } from "../passport/index";

export function registerUser(body) {
  if (!body.email || !body.password) {
    return {
      success: false,
      message: "Please enter email and password."
    };
  } else {
    let newUser = new User({
      email: body.email,
      password: body.password
    });

    newUser.save(function(err) {
      if (err) {
        return {
          success: false,
          message: "That email address already exists."
        };
      }
      return {
        success: true,
        message: "Successfully created new user."
      };
    });
  }
}

export function getAllUsers() {
  User.find({}, function(err, users) {
    return users;
  });
}

export function userAuthentication(body) {
  User.findOne(
    {
      email: body.email
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        return {
          success: false,
          message: "Authentication failed. User not found."
        };
      } else {
        // Check if password matches
        user.comparePassword(body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user, configuration.auth.secret, {
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
  );
}
