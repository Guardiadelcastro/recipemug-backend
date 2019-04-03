import * as express from 'express';

import { createRecipe, getRecipe, updateRecipe, getUserRecipes, deleteRecipe } from '../controllers/RecipeController';
import { isAuth } from '../middlewares/auth'

const router = express.Router();

router.post('/create', isAuth, createRecipe);

router.get('/my-recipes', isAuth, getUserRecipes);

router.get('/get-recipe', isAuth, getRecipe)

router.delete('/delete', isAuth, deleteRecipe); 

router.put('/update', isAuth, updateRecipe)
export = router;
