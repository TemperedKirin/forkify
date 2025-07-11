//import icons from '../img/icons.svg';
import * as model from './model.js'; 
import recipeView from './views/RecipeView.js';
 

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err.message);
  }
};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));