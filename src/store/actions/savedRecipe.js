import axios from '../../utils/axios';

const token = localStorage.getItem('token');

export const getListSavedRecipe = (id) => {
  return {
    type: 'GET_LIST_SAVED_RECIPE',
    payload: axios({
      method: 'GET',
      url: `saved/user/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};

export const createSavedRecipe = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('saved', data, {
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

export const deleteSavedRecipe = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`saved/${id}`, {
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
