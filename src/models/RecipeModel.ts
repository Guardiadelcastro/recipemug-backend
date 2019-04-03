import { Document, Schema, Model, model } from 'mongoose';

export interface DTOIngredient {
  name: string; 
} 


// export interface DTORecipe {
//   uuid: string,
//   title: string,
//   description: string,
//   image: string,
//   ingredients: string[],
//   steps: string[],
//   updated: Date,
//   created: Date,
//   like: number,
//   stars: number, 
//   owner: string
// }


export interface ModelIRecipe extends Document {
  _id: string;
  slug: string,
  title: string,
  description: string,
  image: string,
  ingredients: string[],
  steps: string[],
  updated: Date,
  created: Date,
  like: number,
  stars: number, 
  owner: string
}

const RecipeScheme: Schema = new Schema ({
  slug: {type: String, required: true, unique: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false},
  ingredients: { type: [String],  required: true },
  steps: { type: [String], required: true},
  like: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now() },
  created: { type: Date,  default: Date.now()},
  owner: { type: String, required: true}
});

export const Recipe: Model<ModelIRecipe> = model<ModelIRecipe>('Recipes', RecipeScheme);