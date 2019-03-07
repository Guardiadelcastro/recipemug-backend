import * as express from 'express';

import { createRecipe, getRecipe, updateRecipe, getUserRecipes, deleteRecipe } from '../controllers/RecipeController';
import { isAuth } from '../middlewares/auth'

const router = express.Router();

router.post('/create-recipe', isAuth, createRecipe);

router.get('/my-recipes', isAuth, getUserRecipes);

router.get('/get-recipe', isAuth, getRecipe)

router.delete('/delete-recipe', isAuth, deleteRecipe); 

router.put('/update-recipe', isAuth, updateRecipe)
export = router;
