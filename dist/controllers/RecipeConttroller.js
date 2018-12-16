"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_1 = require("../models/recipe");
const HelperRecipe = require("../helpers/DTORecipeHelper");
function getAllRecipes() {
    return new Promise((resolve, rejects) => {
        recipe_1.Recipe.find({})
            .then(recipe => {
            const response = HelperRecipe.toModelArray(recipe);
            resolve(response);
        })
            .catch(err => {
            rejects(err);
        }); //add toArray and sort.
    });
}
exports.getAllRecipes = getAllRecipes;
function getRecipeById(id) {
    return new Promise((resolve, rejects) => {
        recipe_1.Recipe.findOne({ _id: id })
            .then(recipe => {
            const response = HelperRecipe.toModel(recipe);
            resolve(response);
        })
            .catch(err => {
            rejects(err);
        });
    });
}
exports.getRecipeById = getRecipeById;
function addNewRecipe(owner_id, body) {
    return new Promise((resolve, rejects) => {
        if (!body.title) {
            rejects("Error, maybe you forget the title");
        }
        else {
            const newRecipe = new recipe_1.Recipe(Object.assign({}, body, { created: new Date(), updated: new Date(), like: 0, stars: 0, owner_id: owner_id }));
            newRecipe
                .save()
                .then(() => {
                resolve();
            })
                .catch(err => {
                rejects(err);
            });
        }
    });
}
exports.addNewRecipe = addNewRecipe;
function deleteRecipeById(id) {
    return recipe_1.Recipe.findByIdAndDelete({ _id: id });
}
exports.deleteRecipeById = deleteRecipeById;
function updateRecipe(id, recipeToUpdate) {
    return new Promise((resolve, rejects) => {
        recipe_1.Recipe.findByIdAndUpdate({ _id: id }, { recipeToUpdate, updated: Date.now() })
            .then(() => {
            resolve("Updated with Success");
        })
            .catch(err => {
            rejects(err);
        });
    });
}
exports.updateRecipe = updateRecipe;
