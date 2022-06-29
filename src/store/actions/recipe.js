import axios from '../../utils/axios';
import {
  GET_LATEST_RECIPE_PENDING,
  GET_LATEST_RECIPE_SUCCESS,
  GET_LATEST_RECIPE_FAILED
} from '../types';

export const getLatestRecipe = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LATEST_RECIPE_PENDING,
      payload: null
    });

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/recipe/latest?limit=1`);

    dispatch({
      type: GET_LATEST_RECIPE_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_LATEST_RECIPE_FAILED,
      payload: error.message
    });
  }
};

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
      url: `recipe/${id}`
    })
  };
};

export const getRecipeByUser = (id) => {
  return {
    type: 'GET_MY_RECIPE',
    payload: axios({
      method: 'GET',
      url: `recipe/user/${id}`
    })
  };
};

export const createRecipe = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('recipe', data, {
        headers: {
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
      .delete(`recipe/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
