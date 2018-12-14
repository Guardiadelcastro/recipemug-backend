import { Document, Schema, Model, model } from 'mongoose';


class Ingredient implements DTOIngredient{
  name: string;
}
export interface DTOIngredient {
  name: string; 
} 


export interface DTORecipe {
  uuid: string,
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


export interface ModelIRecipe extends Document {
  _id: string;
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
  ingredients: { type: [String],  required: true },
  steps: { type: [String], required: true},
  like: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now() },
  created: { type: Date,  default: Date.now()},
});

export const Recipe: Model<ModelIRecipe> = model<ModelIRecipe>('recipes', RecipeScheme);