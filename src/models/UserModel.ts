import * as bcrypt  from 'bcrypt';
import { Document, Schema, Model, model } from 'mongoose';

export interface DTOUser {
  uuid: string,
  username: string
  email: string,
  password: string,

}

export interface ModelIUsers extends Document {
  _id: string,
  usermane: string,
  email: string,
  password: string,
  recipes: typeof Array,
  comparePassword: typeof comparePassword  
}

const  UserSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  recipes: {
    type: Array
  }
});
type comparePasswordFunction = (candidatePassword: string) => Promise<boolean>;
// Hash the user's password before inserting a new user
UserSchema.pre('save', async function hashPassword(next) {
  try {
    const user = this as ModelIUsers

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});


const comparePassword: comparePasswordFunction = async function(candidatePassword) {
  try {
    const user = this as ModelIUsers;
    const compare = await bcrypt.compare(candidatePassword, user.password);
    return compare;
  } catch(err) {
    console.error(err)
  }
};

// Compare password input to password saved in database
UserSchema.methods.comparePassword = comparePassword



// Export the model
export const User: Model<ModelIUsers> = model<ModelIUsers>('User', UserSchema);