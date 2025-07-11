
import { API_URL } from './views/config.js';
import { getJSON } from './views/helpers.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`); //Usa helpers.js
    
    state.recipe = {
      id: data.data.recipe.id,
      title: data.data.recipe.title,
      publisher: data.data.recipe.publisher,
      sourceUrl: data.data.recipe.source_url,
      image: data.data.recipe.image_url,
      servings: data.data.recipe.servings,
      cookingTime: data.data.recipe.cooking_time,
      ingredients: data.data.recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err} 💥💥💥💥`); 
    throw err;
  }
};