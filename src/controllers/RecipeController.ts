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
    res.json({message: 'New recipe created', newRecipe})
  } catch(err) {
    res.status(400).json({err});
  }
}

export async function getUserRecipes(req, res) {
  try {
    const { owner } = req.params;
    const recipes = await Recipe.find({ owner: owner }, {_id: 0, __v: 0});
    res.json(recipes);
  } catch (err) {
    res.status(400).json({err});
  }
}

export async function getRecipe(req, res) {
  try {
    const { id } = req.body;
    const recipe = await Recipe.findOne({ _id: id }, , {_id: 0, __v: 0});
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
    res.json({message: `Recipe updated`}, recipe);
  } catch (err) {
    res.status(400).json({err});
  }
}
