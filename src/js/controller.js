import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import searchView from './views/SearchView.js';
import resultsView from './views/ResultsView.js';
import paginationView from './views/PaginationViews.js';

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

const controlSearchResults = async function() {
  try {
    // Resetear búsqueda previa
    model.resetSearch(); 
    
    const query = searchView.getQuery();
    if (!query) return;
    
    await model.loadSearchResults(query);
    
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
    
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function(goToPage) {
  
 resultsView.render(model.getSearchResultsPage(goToPage));
  
  // Renderizar nuevos botones
  paginationView.render(model.state.search);
  
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerClick(controlPagination);
  paginationView.addHandlerClick(controlPagination);
};



init();