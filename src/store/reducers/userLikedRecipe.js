import {
  GET_USER_LIKED_RECIPE_PENDING,
  GET_USER_LIKED_RECIPE_SUCCESS,
  GET_USER_LIKED_RECIPE_FAILED
} from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null
};

const userLikedRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIKED_RECIPE_PENDING:
      return { ...state, isLoading: true };
    case GET_USER_LIKED_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data
      };
    case GET_USER_LIKED_RECIPE_FAILED:
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

export default userLikedRecipeReducer;
