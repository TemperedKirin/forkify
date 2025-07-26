import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query!';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
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
  `;
  }

  _generatePaginationButtons() {
    const numPages = Math.ceil(
      model.state.search.results.length / model.state.search.resultsPerPage
    );
    const currentPage = model.state.search.page;

    // Página 1 y hay más páginas
    if (currentPage === 1 && numPages > 1) {
      return this._createNextButton(currentPage);
    }

    // Última página
    if (currentPage === numPages && numPages > 1) {
      return this._createPrevButton(currentPage);
    }

    // Página intermedia
    if (currentPage < numPages) {
      return `
        ${this._createPrevButton(currentPage)}
        ${this._createNextButton(currentPage)}
      `;
    }

    // Solo 1 página
    return '';
  }

  _createPrevButton(currentPage) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        currentPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
    `;
  }

  _createNextButton(currentPage) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        currentPage + 1
      }">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new ResultsView();
