import axios from '../../utils/axios';

const token = localStorage.getItem('token');

export const getAllRecipes = (page, limit, sort) => {
  return {
    type: 'GET_ALL_RECIPES',
    payload: axios({
      method: 'GET',
      url: `recipe/list?search=&page=${page}&limit=${limit}&sortType=${sort}`
    })
  };
};

export const getSearchRecipe = (search) => {
  return {
    type: 'SEARCH_RECIPE',
    payload: axios({
      method: 'GET',
      url: `recipe/list?search=${search}`
    })
  };
};

export const getSortRecipe = (sort) => {
  return {
    type: 'SORT_RECIPE',
    payload: axios({
      method: 'GET',
      url: `recipe/list?sort=${sort}&sortType=ASC`
    })
  };
};

export const getRecipeById = (id) => {
  return {
    type: 'GET_DETAIL_RECIPE',
    payload: axios({
      method: 'GET',
      url: `recipe/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};

export const getRecipeByUser = (id) => {
  return {
    type: 'GET_MY_RECIPE',
    payload: axios({
      method: 'GET',
      url: `recipe/user/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};

export const createRecipe = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('recipe', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateRecipe = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`recipe/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
