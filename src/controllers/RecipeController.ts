import { Recipe, ModelIRecipe } from '../models/RecipeModel';

export async function createRecipe(req, res) {
  try{
    const recipe = req.body.recipe
    const newRecipe: ModelIRecipe = new Recipe({
      ...recipe,
      created: new Date(),
      updated: new Date(),
      like: 0,
      stars: 0
    })
    await newRecipe.save();
    newRecipe.toObject();
    newRecipe.id = newRecipe._id;
    delete newRecipe._id;
    delete newRecipe.__v;
    res.json({message: 'New recipe created', newRecipe})
  } catch(err) {
    res.status(400).json({err});
  }
}

export async function getUserRecipes(req, res) {
  try {
    const { owner } = req.params;
    let recipes = await Recipe.find({ owner: owner }, {__v: 0});
    const userRecipes = recipes.map(recipe => {
      recipe = recipe.toObject();
      recipe.id = recipe._id;
      delete recipe._id;
      return recipe;
      });
    res.json(userRecipes);
  } catch (err) {
    res.status(400).json({err});
  }
}

export async function getRecipe(req, res) {
  try {
    const { id } = req.body;
    const recipe = await Recipe.findOne({ _id: id }, {_id: 0, __v: 0});
    res.json(recipe);
  } catch (err) {
    res.status(400).json({err});
  }
}

export async function updateRecipe(req, res) {
  try {
    const { recipe } = req.body;
    const recipeToUpdate = await Recipe.findOneAndUpdate({_id: recipe.id}, {
      $set: { ...recipe, updated: Date.now()}}, {new: true}
      )
      console.log(recipe);
      res.json({message: `Recipe updated`});
    } catch (err) {
      res.status(400).json({err});
    }
  }
  
export async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const recipeToDelete = await Recipe.findOneAndDelete({ _id: id });
    res.json({message: `Recipe deleted`});
  } catch (err) {
    res.status(400).json({err});
  }
}
