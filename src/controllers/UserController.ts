import { User } from "../models/user";

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
