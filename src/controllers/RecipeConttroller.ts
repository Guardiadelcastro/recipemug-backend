
import { Recipe } from '../models/recipe';


export function getAllRecipes() {
  return Recipe.find({}).limit(20); //add toArray and sort. 
}

export function getRecipeById(id: number) {
  return Recipe.find({_id: id});
}

export function addNewRecipe(body: JSON) {
  const newRecipe = new Recipe({
    ...body,
    created: new Date(),
    updated: new Date()
  });
  
  return newRecipe; 
}

