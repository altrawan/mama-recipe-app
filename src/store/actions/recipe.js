import axios from '../../utils/axios';
import {
  GET_LATEST_RECIPE_PENDING,
  GET_LATEST_RECIPE_SUCCESS,
  GET_LATEST_RECIPE_FAILED,
  GET_LIST_RECIPE_PENDING,
  GET_LIST_RECIPE_SUCCESS,
  GET_LIST_RECIPE_FAILED,
  GET_USER_RECIPES_PENDING,
  GET_USER_RECIPES_SUCCESS,
  GET_USER_RECIPES_FAILED,
  GET_DETAIL_RECIPE_PENDING,
  GET_DETAIL_RECIPE_SUCCESS,
  GET_DETAIL_RECIPE_FAILED
} from '../types';

export const getLatestRecipe = (limit) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LATEST_RECIPE_PENDING,
      payload: null
    });

    const res = await axios.get(`recipe/latest?limit=${limit}`);

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

export const getListRecipe = (url, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_RECIPE_PENDING,
      payload: null
    });

    const res = await axios.get(url);

    dispatch({
      type: GET_LIST_RECIPE_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
        return navigate('/auth/login');
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_LIST_RECIPE_FAILED,
      payload: error.message
    });
  }
};

export const getDetailRecipe = (id, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DETAIL_RECIPE_PENDING,
      payload: null
    });

    const res = await axios.get(`recipe/${id}`);

    dispatch({
      type: GET_DETAIL_RECIPE_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
        return navigate('/auth/login');
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_DETAIL_RECIPE_FAILED,
      payload: error.message
    });
  }
};

export const getUserRecipes = (id, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_RECIPES_PENDING,
      payload: null
    });

    const res = await axios.get(`user/recipe/${id}`);

    dispatch({
      type: GET_USER_RECIPES_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
        return navigate('/auth/login');
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_USER_RECIPES_FAILED,
      payload: error.message
    });
  }
};

export const createRecipe = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('recipe', data)
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
      .put(`recipe/${id}`, data)
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
