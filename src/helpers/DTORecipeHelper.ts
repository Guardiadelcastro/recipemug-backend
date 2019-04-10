import { ModelIRecipe, DTORecipe } from "../models/RecipeModel";

export function toModel(recipeDocument: ModelIRecipe): DTORecipe {  
  const newRecipe: DTORecipe  = {
    ...recipeDocument.toObject(),
    uuid: recipeDocument._id, 
     
  } 

  delete newRecipe['__v'];
  delete newRecipe['_id'];
  return (newRecipe as DTORecipe); 
}

export function toModelArray(recipeDocument: ModelIRecipe[]): DTORecipe[] {
  const newRecipes: DTORecipe[] = [];

  recipeDocument.forEach(recipe => {
    const newDTORecipe: DTORecipe = {
      ...recipe.toObject(),
      uuid: recipe._id,
    }
    delete newDTORecipe['_id'];
    delete newDTORecipe['__v'];
    newRecipes.push(newDTORecipe);
  });

  return (newRecipes);
}

