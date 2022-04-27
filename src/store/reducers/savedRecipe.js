const initialState = {
  data: [],
  isError: false,
  isLoading: false,
  message: ''
};

export default function savedRecipe(state = initialState, action) {
  switch (action.type) {
    case 'GET_LIST_SAVED_RECIPE_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
        message: ''
      };
    case 'GET_LIST_SAVED_RECIPE_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.message
      };
    case 'GET_LIST_SAVED_RECIPE_REJECTED': {
      return {
        ...state,
        isError: true,
        isLoading: true,
        message: action.payload.data.message
      };
    }
    default:
      return state;
  }
}
