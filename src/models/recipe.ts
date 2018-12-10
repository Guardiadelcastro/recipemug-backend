import { Document, Schema, Model, model } from 'mongoose';

/*
export interface Ingredients {
  name: string;
} 
*/


export interface IRecipe extends Document {
  title: string,
  description: string,
  image: string,
  ingredients: string[],
  steps: string[],
  updated: Date,
  created: Date,
  like: number,
  stars: number
}

const RecipeScheme: Schema = new Schema ({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false},
  ingredients: { type: String,  required: true },
  steps: { type: String, required: true},
  like: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now() },
  created: { type: Date,  default: Date.now()}
});

export const Recipe: Model<IRecipe> = model<IRecipe>('recipes',RecipeScheme);