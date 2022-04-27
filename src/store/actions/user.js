import axios from '../../utils/axios';

const token = localStorage.getItem('token');

export const getUserById = (id) => {
  return {
    type: 'GET_DETAIL_USER',
    payload: axios({
      method: 'GET',
      url: `user/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};

export const updatePhoto = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`user/photo/${id}`, data, {
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

export const updateProfile = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`user/profile/${id}`, data, {
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

export const updatePassword = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`user/password/${id}`, data, {
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
