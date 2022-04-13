import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import * as model from './model.js';
import addRecipeView from './views/addRecipeView.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    // get id from url
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // add active link
    resultsView.update(model.getSearchResultPage());
    // loading recipe
    await model.loadRecipe(id);
    // rendering recipe
    recipeView.render(model.state.recipe);
    // update bookmarks
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (page) {
  resultsView.render(model.getSearchResultPage(page));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update recipe servings
  model.updateServings(newServings);
  // update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.isBookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update recipe view
  recipeView.update(model.state.recipe);
  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show spinner
    addRecipeView.renderSpinner()
    // upload new recipe data
    await model.uploadRecipe(newRecipe);
    // render recipe
    recipeView.render(model.state.recipe)
    // render succes message
    addRecipeView.renderMessage()
    // render bookmarks
    bookmarksView.render(model.state.bookmarks)
    // change hash
    window.history.pushState(null,"",`#${model.state.recipe.id}`)
    // close window
    setTimeout(() => {
      addRecipeView._toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.log(error)
    addRecipeView.renderError(error.message)
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
