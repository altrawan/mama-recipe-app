import axios from '../../utils/axios';

export const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('auth/login', data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const register = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('auth/register', data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const forgot = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('auth/forgot', data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const verification = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('auth/verification', data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const reset = (data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`auth/reset/${token}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
