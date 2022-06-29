import {
  GET_RECIPE_COMMENTS_PENDING,
  GET_RECIPE_COMMENTS_SUCCESS,
  GET_RECIPE_COMMENTS_FAILED
} from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null
};

const recipeCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE_COMMENTS_PENDING:
      return { ...state, isLoading: true };
    case GET_RECIPE_COMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data
      };
    case GET_RECIPE_COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload
      };
    default:
      return state;
  }
};

export default recipeCommentsReducer;
