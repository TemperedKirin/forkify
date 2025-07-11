const icons = new URL('../../img/icons.svg', import.meta.url).href;
import { Fraction } from 'fraction.js';

class RecipeView {
  #parentElement = document.querySelector('.recipe'); //Elemento privado
  #data; //Datos privados

   renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this.#clear(); // Limpia el contenedor
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = 'Algo salió mal 😢') {
    this.#clear();
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="error">
        <svg><use href="${icons}#icon-alert-triangle"></use></svg>
        <p>${message}</p>
      </div>
      `
    );
  }

  //Método render
  render(data) {
    this.#data = data; //Asigna datos
    this.#clear(); //Limpia el contenedor
    const markup = this.#generateMarkup(); //Genera markup
    this.#parentElement.insertAdjacentHTML('afterbegin', markup); // Inserta en el DOM
  }

  //Método privado para generar HTML
  #generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <!-- ... (resto del markup, usando this.#data) ... -->
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this.#data.ingredients
              .map(
                ing => `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">
                ${ing.quantity ? new Fraction(ing.quantity).toString() : ''}
                </div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      </div>
    `;
  }

  //Método privado para limpiar el contenedor
  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

export default new RecipeView();
