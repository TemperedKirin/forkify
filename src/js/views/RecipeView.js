const icons = new URL('../../img/icons.svg', import.meta.url).href;
import { Fraction } from 'fraction.js';
import View from './View.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe'); // Cambiado de # a _
  _errorMessage = 'We could not find that recipe. Please try another one';
  _message = 'Recipe loaded successfully!'; // Renombrado de _successMessage a _message (para coincidir con la clase padre)



  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, () => handler());
    });
  }

  _generateMarkup() { // Cambiado de #generateMarkup a _generateMarkup
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(ing => `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">
                    ${ing.quantity ? new Fraction(ing.quantity).toFraction(true) : ''}
                  </div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                    ${ing.description}
                  </div>
                </li>
              `).join('')}
          </ul>
        </div>
      </div>
    `;
  }
}

export default new RecipeView();