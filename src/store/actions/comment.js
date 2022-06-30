import axios from '../../utils/axios';
import {
  GET_RECIPE_COMMENTS_PENDING,
  GET_RECIPE_COMMENTS_SUCCESS,
  GET_RECIPE_COMMENTS_FAILED
} from '../types';

export const getRecipeComments = (id, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: GET_RECIPE_COMMENTS_PENDING,
      payload: null
    });

    const res = await axios.get(`recipe/comment/${id}`);

    dispatch({
      type: GET_RECIPE_COMMENTS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
        return navigate('/auth');
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_RECIPE_COMMENTS_FAILED,
      payload: error.message
    });
  }
};

export const createComment = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('comment', data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
