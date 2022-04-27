import axios from '../../utils/axios';

export const getListRecipe = (page, limit, sort) => {
  return {
    type: 'GET_LIST_RECIPE',
    payload: axios({
      method: 'GET',
      url: `recipe/list?search=&page=${page}&limit=${limit}&sortType=${sort}`
    })
  };
};
