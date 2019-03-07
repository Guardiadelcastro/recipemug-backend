import { DTORecipe, Recipe, ModelIRecipe } from "../models/RecipeModel";
import * as HelperRecipe from "../helpers/DTORecipeHelper";

export async function createRecipe(req, res) {
  try{
    const body = req.body
    const newRecipe: ModelIRecipe = new Recipe({
      ...body,
      created: new Date(),
      updated: new Date(),
      like: 0,
      stars: 0
    })
    await newRecipe.save();
    res.json({message: 'New recipe created', newRecipe})
  } catch(err) {
    res.status(400).json({err});
  }
}

export async function getUserRecipes(req, res) {
  try {
    const { owner } = req.body;
    const recipes = await Recipe.find({ owner });
    res.json(recipes);
  } catch (err) {
    res.status(400).json({err});
  }
}

export async function getRecipe(req, res) {
  try {
    const { id } = req.body;
    const recipe = await Recipe.findOne({ _id: id });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({err});
  }
}

export async function deleteRecipe(req, res) {
  try {
    const { id } = req.body;
    const recipe = await Recipe.findOneAndDelete({ _id: id });
    res.json({message: `Recipe ${recipe.title} deleted`});
  } catch (err) {
    res.status(400).json({err});
  }
}
export async function updateRecipe(req, res) {
  try {
    const { id, updates} = req.body;
    const recipe = await Recipe.findOneAndUpdate({_id: id}, {
      $set: { ...updates, updated: Date.now()}
    })
    res.json({message: `Recipe updated`});
  } catch (err) {
    res.status(400).json({err});
  }
}
