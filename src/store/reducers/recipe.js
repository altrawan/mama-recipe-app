const initialState = {
  data: [],
  pageInfo: {},
  isError: false,
  isLoading: false,
  message: ''
};

export default function recipe(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_RECIPES_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
        message: '',
        pageInfo: {}
      };
    case 'GET_ALL_RECIPES_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.message,
        pageInfo: action.payload.data.pagination
      };
    case 'GET_ALL_RECIPES_REJECTED': {
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: action.payload.response.data.message
      };
    }
    case 'SEARCH_RECIPE_PENDING': {
      return {
        ...state,
        isError: false,
        isLoading: true,
        message: ''
      };
    }
    case 'SEARCH_RECIPE_FULFILLED': {
      return {
        ...state,
        isError: false,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.message
      };
    }
    case 'SEARCH_RECIPE_REJECTED': {
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: action.payload.response.data.message
      };
    }
    case 'SORT_RECIPE_PENDING': {
      return {
        ...state,
        isError: false,
        isLoading: true,
        message: ''
      };
    }
    case 'SORT_RECIPE_FULFILLED': {
      return {
        ...state,
        isError: false,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.message
      };
    }
    case 'SORT_RECIPE_REJECTED': {
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: action.payload.response.data.message
      };
    }
    case 'GET_DETAIL_RECIPE_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
        message: ''
      };
    case 'GET_DETAIL_RECIPE_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.message
      };
    case 'GET_DETAIL_RECIPE_REJECTED': {
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: action.payload.response.data.message
      };
    }
    case 'GET_MY_RECIPE_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
        message: ''
      };
    case 'GET_MY_RECIPE_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.message
      };
    case 'GET_MY_RECIPE_REJECTED': {
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: action.payload.response.data.message
      };
    }
    default:
      return state;
  }
}
