import * as bcrypt  from 'bcrypt';
import { Document, Schema, Model, model } from 'mongoose';

export interface DTOUser {
  uuid: string,
  email: string,
  password: string,
}

export interface ModelIUsers extends Document {
  _id: string,
  email: string,
  password: string,
  comparePassword: typeof comparePassword  
}

const  UserSchema: Schema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash the user's password before inserting a new user
UserSchema.pre('save', function(next) {
  var user = this as ModelIUsers;  //RAUL.   
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

function comparePassword(pw: string, cb) {
  console.log(pw);
  console.log(this.password);
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    console.log(err);
    console.log(isMatch);
    if (err) {
      console.log('ERROR')
      return cb(err);
    }
    console.log('CB');
    cb(null, isMatch);
  });
};

// Compare password input to password saved in database
UserSchema.methods.comparePassword = comparePassword



// Export the model
export const User: Model<ModelIUsers> = model<ModelIUsers>('User', UserSchema);