import * as express from 'express';
import { getAllRecipes, addNewRecipe, deleteRecipeById, updateRecipe, getuserRecipes } from '../controllers/RecipeController';
const router = express.Router();


router.get('/:id', (req: express.Request, res: express.Response) => {
  getuserRecipes(req.params.id).then(recipe => {res.json(recipe)})
                            .catch(err => {res.status(500).send(err)});
});

router.get('/', (req: express.Request, res: express.Response) =>  {
 getAllRecipes().then(recipes => {res.json(recipes)})
                .catch(err => res.status(500).send(err));
});

router.post('/:id', (req: express.Request, res: express.Response) => {
  addNewRecipe(req.params.id, req.body).then(() => res.send('New Recipe Created'))
                        .catch((err) => res.status(500).send(err));
});

router.delete('/:id', (req: express.Request, res: express.Response) => {
  deleteRecipeById(req.params.id).then((recipe) => res.send('Recipe deleted with success' + recipe)) 
                               .catch((err) => res.status(500).send(err));
}); 


router.put('/:id', (req: express.Request, res: express.Response) => {
  const idToUpdate = req.params.id;
  const updatedRecipe = req.body;
  updateRecipe(idToUpdate, updatedRecipe).then((message) => {res.send(message)})
                                         .catch((err) => {res.status(500).send(err)});
})
export = router;
