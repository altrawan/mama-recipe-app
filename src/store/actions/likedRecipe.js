import axios from '../../utils/axios';

const token = localStorage.getItem('token');

export const getListLikedRecipe = (id) => {
  return {
    type: 'GET_LIST_LIKED_RECIPE',
    payload: axios({
      method: 'GET',
      url: `liked/user/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};

export const createLikedRecipe = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('liked', data, {
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

export const deleteLikedRecipe = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`liked/${id}`, {
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
