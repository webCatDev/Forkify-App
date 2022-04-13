import icons from 'url:../../img/icons.svg';
import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
    _message = "Recipe was successfully uploaded!"

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
  }

  addHandlerUpload(handler){
      this._parentElement.addEventListener("click", function(e){
          e.preventDefault()
            const uploadBtn = e.target.closest(".upload__btn")
            if(!uploadBtn) return 
          const dataArr = [...new FormData(this)]
          const data  =  Object.fromEntries(dataArr)
          handler(data)
      })
  }
  _generateMarkup() {}
}


export default new AddRecipeView();
