const icons = new URL('../../img/icons.svg', import.meta.url).href;

class SearchView {
  #parentEl = document.querySelector('.search');
  #errorMessage = 'No recipes found for your query! Please try again ;)';
  #searchResultsEl = document.querySelector('.search-results');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value.trim();
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  renderSpinner() {
    this.#searchResultsEl.innerHTML = '';
    this.#searchResultsEl.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="spinner">
        <svg><use href="${icons}#icon-loader"></use></svg>
      </div>
    `
    );
  }

  renderResults(results) {
    this.#searchResultsEl.innerHTML = '';

    const markup = results
      .map(
        result => `
      <li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
          </div>
        </a>
      </li>
    `
      )
      .join('');

    this.#searchResultsEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.#errorMessage) {
    this.#parentEl.innerHTML = '';
    this.#parentEl.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="error">
        <svg><use href="${icons}#icon-alert-triangle"></use></svg>
        <p>${message}</p>
      </div>
    `
    );
  }
}

export default new SearchView();
