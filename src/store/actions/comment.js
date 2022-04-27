import axios from '../../utils/axios';

const token = localStorage.getItem('token');

export const getListComment = (id) => {
  return {
    type: 'GET_LIST_COMMENTS',
    payload: axios({
      method: 'GET',
      url: `comment/recipe/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};

export const createComment = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('comment', data, {
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
