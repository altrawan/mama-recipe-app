import {
  GET_USER_RECIPES_PENDING,
  GET_USER_RECIPES_SUCCESS,
  GET_USER_RECIPES_FAILED
} from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null
};

const userRecipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_RECIPES_PENDING:
      return { ...state, isLoading: true };
    case GET_USER_RECIPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data
      };
    case GET_USER_RECIPES_FAILED:
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

export default userRecipesReducer;
