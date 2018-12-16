"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RecipeScheme = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    like: { type: Number, default: 0 },
    stars: { type: Number, default: 0 },
    updated: { type: Date, default: Date.now() },
    created: { type: Date, default: Date.now() },
    owner_id: { type: String, required: true }
});
exports.Recipe = mongoose_1.model('recipes', RecipeScheme);
//# sourceMappingURL=recipe.js.map