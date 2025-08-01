
import { API_URL, RES_PER_PAGE } from './views/config.js';
import { getJSON } from './views/helpers.js';

export const state = {
  recipe: {},
   search: {
    query: '',
    results: [], // Array para almacenar resultados
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};
//Método para resetear la búsqueda
export const resetSearch = function() {
  state.search = {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE
  };
};

export const loadSearchResults = async function(query) {
  try {
    state.search.query = query; // Guarda el término de búsqueda
    
    // Fetch a la API
    const data = await getJSON(`${API_URL}?search=${query}`); 
    
    // Mapeo de resultados
    state.search.results = data.data.recipes.map(rec => { 
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

        console.log(state.search.results); // Debug
    
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  };
};



export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`); 
    
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

export const getSearchResultsPage = function(page = state.search.page) {
  state.search.page = page; // Actualiza la página actual
  
  const start = (page - 1) * state.search.resultsPerPage; // 0, 10, 20...
  const end = page * state.search.resultsPerPage; // 10, 20, 30...
  
  return state.search.results.slice(start, end);
};