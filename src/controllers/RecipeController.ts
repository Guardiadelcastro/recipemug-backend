import { DTORecipe, Recipe, ModelIRecipe } from "../models/RecipeModel";
import * as HelperRecipe from "../helpers/DTORecipeHelper";

export function getAllRecipes() {
  return new Promise<DTORecipe[]>((resolve, rejects) => {
    Recipe.find({})
      .then(recipe => {
        const response = HelperRecipe.toModelArray(recipe);
        resolve(response);
      })
      .catch(err => {
        rejects(err);
      }); 
  });
}

export function getuserRecipes(userId: number) {
  return new Promise<DTORecipe[]>((resolve, rejects) => {
    Recipe.find({ owner_id: userId })
      .then(recipe => {
        const response = HelperRecipe.toModelArray(recipe);
        resolve(response);
      })
      .catch(err => {
        rejects(err);
      });
  });
}

export function addNewRecipe(owner_id: string, body: DTORecipe) {
  return new Promise((resolve, rejects) => {
    if (!body.title) {
      rejects("Error, maybe you forget the title");
    } else {
      const newRecipe = new Recipe({
        ...body,
        created: new Date(),
        updated: new Date(),
        like: 0,
        stars: 0,
        owner_id: owner_id
      });
      newRecipe
        .save()
        .then(() => {
          resolve();
        })  
        .catch(err => {
          rejects(err);
        });
    }
  });
}

export function deleteRecipeById(id: number) {
  return Recipe.findByIdAndDelete({ _id: id });
}

export function updateRecipe(id: string, recipeToUpdate: DTORecipe) {
  return new Promise((resolve, rejects) => {
    
    Recipe.findByIdAndUpdate(id,
      { $set: {...recipeToUpdate, updated: Date.now()}}
    )
      .then(() => {
        resolve("Updated with Success");
      })
      .catch(err => {
        rejects(err);
      });
  });
}
