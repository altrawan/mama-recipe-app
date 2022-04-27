const initialState = {
  data: [],
  pageInfo: {},
  isError: false,
  isLoading: false,
  message: ''
};

export default function comment(state = initialState, action) {
  switch (action.type) {
    case 'GET_LIST_COMMENTS_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
        message: '',
        pageInfo: {}
      };
    case 'GET_LIST_COMMENTS_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.message,
        pageInfo: action.payload.data.pagination
      };
    case 'GET_LIST_COMMENTS_REJECTED': {
      return {
        ...state,
        isError: true,
        isLoading: true,
        message: action.payload.response.data.message
      };
    }
    default:
      return state;
  }
}
