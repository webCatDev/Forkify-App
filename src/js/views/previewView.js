import View from './View';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = document.querySelector('*');
  
  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return ` 
        <li class="preview">
            <a class="preview__link ${
              this._data.id === id ? 'preview__link--active' : ''
            }" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="Test" />
              </figure>
              <div class="preview__this._data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
                </div>
                <div class="preview__user-generated ${
                  this._data.key ? '' : "hidden"
                }">
             <svg>
               <use href="${icons}#icon-user"></use>
             </svg>
           </div>
            </a>
          </li>`;
  }
}

export default new PreviewView();