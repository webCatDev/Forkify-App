

class SearchView  {
  _parentElement = document.querySelector('.search');
  _inputElement = this._parentElement.querySelector('.search__field')
  getQuery() {
    const query = this._inputElement.value.trim() ? this._inputElement.value.trim() : "empty_input";
    this.#clearInput()
    return query
  }

  #clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
