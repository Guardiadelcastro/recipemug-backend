import { DTORecipe, Recipe, ModelIRecipe } from "../models/recipe";
import * as HelperRecipe from '../helpers/DTORecipeHelper';
import { start } from "repl";

// Hacer el helper para transfomar de _id -> uuid. 

export function getAllRecipes() {
  return new Promise<DTORecipe[]> ((resolve, rejects) => {
    Recipe.find({}).then ((recipe) => {
      const response = HelperRecipe.toModelArray(recipe);
      resolve(response);
    })
    .catch((err) => { rejects(err)}); //add toArray and sort. 
  }); 
}

export function getRecipeById(id: number) {
  return new Promise<DTORecipe>((resolve, rejects) => {
    Recipe.findOne({_id: id}).then((recipe) => {
      const response = HelperRecipe.toModel(recipe);
       resolve(response);
    })
    .catch((err) => { rejects(err)});
  }); 
}

export function addNewRecipe(body: DTORecipe) {
  const newRecipe = new Recipe({
    ...body,
    created: new Date(),
    updated: new Date(),
    like: 0,
    stars: 0
  });

  return newRecipe.save(); 
}

export function deleteRecipeById(id: number) {
  return Recipe.findByIdAndDelete({_id: id});
}

export function updateRecipe(id: string, body: DTORecipe) { 
  return Recipe.findByIdAndUpdate({_id: id}, body)
}


