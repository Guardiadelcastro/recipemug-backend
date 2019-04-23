import { Document, Schema, Model, model } from 'mongoose';

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
  stars: number, 
  owner: string
}


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

const RecipeSchema: Schema = new Schema ({
  title: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false},
  ingredients: { type: [String],  required: false },
  steps: { type: [String], required: false},
  like: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now() },
  created: { type: Date,  default: Date.now()},
  slug: {type: String, required: true, unique: true},
  owner: { type: String, required: true}
});

RecipeSchema.method('toClient', function() {
  let obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});
export const Recipe: Model<ModelIRecipe> = model<ModelIRecipe>('Recipes', RecipeSchema);