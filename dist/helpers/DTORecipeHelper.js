"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toModel(recipeDocument) {
    const newRecipe = Object.assign({}, recipeDocument.toObject(), { uuid: recipeDocument._id });
    delete newRecipe['__v'];
    delete newRecipe['_id'];
    return newRecipe;
}
exports.toModel = toModel;
function toModelArray(recipeDocument) {
    let newRecipes = [];
    recipeDocument.forEach(recipe => {
        let newDTORecipe = Object.assign({}, recipe.toObject(), { uuid: recipe._id });
        delete newDTORecipe['_id'];
        delete newDTORecipe['__v'];
        newRecipes.push(newDTORecipe);
    });
    return (newRecipes);
}
exports.toModelArray = toModelArray;
