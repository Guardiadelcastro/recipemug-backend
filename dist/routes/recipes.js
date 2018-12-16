"use strict";
const express = require("express");
const RecipeConttroller_1 = require("../controllers/RecipeConttroller");
const router = express.Router();
router.get('/:id', (req, res) => {
    RecipeConttroller_1.getRecipeById(req.params.id).then(recipe => { res.json(recipe); })
        .catch(err => { res.status(500).send(err); });
});
router.get('/', (req, res) => {
    RecipeConttroller_1.getAllRecipes().then(recipes => { res.json(recipes); })
        .catch(err => res.status(500).send(err));
});
router.post('/:id', (req, res) => {
    RecipeConttroller_1.addNewRecipe(req.params.id, req.body).then(() => res.send('New Recipe Created'))
        .catch((err) => res.status(500).send(err));
    // res.send(addNewRecipe(req.body));
});
router.delete('/:id', (req, res) => {
    RecipeConttroller_1.deleteRecipeById(req.params.id).then((recipe) => res.send('Recipe deleted with success' + recipe))
        .catch((err) => res.status(500).send(err));
});
router.put('/:id', (req, res) => {
    const idToUpdate = req.params.id;
    const updatedRecipe = req.body;
    RecipeConttroller_1.updateRecipe(idToUpdate, updatedRecipe).then((message) => { res.send(message); })
        .catch((err) => { res.status(500).send(err); });
});
module.exports = router;
