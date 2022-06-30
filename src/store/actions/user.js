import axios from '../../utils/axios';
import { GET_DETAIL_USER_PENDING, GET_DETAIL_USER_SUCCESS, GET_DETAIL_USER_FAILED } from '../types';

export const getDetailUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DETAIL_USER_PENDING,
      payload: null
    });

    const res = await axios.get(`user/${id}`);

    dispatch({
      type: GET_DETAIL_USER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_DETAIL_USER_FAILED,
      payload: error.message
    });
  }
};

export const updateProfile = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`user/${id}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updatePhoto = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`user/photo/${id}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updatePassword = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`user/password/${id}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
