import { combineReducers } from 'redux';

import user from './user';
import recipe from './recipe';
import comment from './comment';
import savedRecipe from './savedRecipe';
import likedRecipe from './likedRecipe';
import listRecipe from './listRecipe';

export default combineReducers({
  user,
  recipe,
  comment,
  savedRecipe,
  likedRecipe,
  listRecipe
});
