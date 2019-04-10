import * as express from 'express';

import { createRecipe, getRecipe, updateRecipe, getUserRecipes, deleteRecipe } from '../controllers/RecipeController';
import { isAuth } from '../middlewares/auth'

const router = express.Router();

router.post('/create', isAuth, createRecipe);

router.get('/my-recipes/:owner', isAuth, getUserRecipes);

router.get('/get-recipe', isAuth, getRecipe)

router.put('/update', isAuth, updateRecipe)

router.delete('/delete/:id', isAuth, deleteRecipe); 

export = router;
