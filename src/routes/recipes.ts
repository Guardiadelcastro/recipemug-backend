import * as express from 'express';
import { getAllRecipes, getRecipeById, addNewRecipe } from '../controllers/RecipeConttroller';
const router = express.Router();


router.get('/:id', (req: express.Request, res: express.Response) => {
  getRecipeById(req.body.id).then(recipe => {res.jsonp(recipe)})
                            .catch(err => {res.status(500).send(err)});
})
router.get('/', (req: express.Request, res: express.Response) =>  {
 getAllRecipes().then(recipes => {res.json(recipes)})
                .catch(err => res.status(500).send(err));
});

router.post('/recipe', (req: express.Request, res: express.Response) => {
  addNewRecipe(req.body).then(() => res.send('New Recipe Created'))
                       // .catch((err) => res.status(500).send(err));
 // res.send(addNewRecipe(req.body));
});

export default router;
