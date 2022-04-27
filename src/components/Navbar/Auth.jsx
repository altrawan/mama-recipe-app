import React from 'react';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import userIcon from '../../assets/icons/User icon.png';

function Auth({ isLogin }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Decoded Token
  let decoded = '';
  if (isLogin) {
    decoded = jwt_decode(isLogin);
  }

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      {isLogin ? (
        <div className={location.pathname === '/' ? 'nav-auth' : 'nav-inverse'}>
          {decoded.photo ? (
            <img
              src={`${
                process.env.REACT_APP_STAGING === 'dev'
                  ? `${process.env.REACT_APP_DEV}uploads/user/${decoded.photo}`
                  : `${process.env.REACT_APP_PROD}uploads/user/${decoded.photo}`
              }`}
              alt={decoded.name}
            />
          ) : (
            <img
              src={`${
                process.env.REACT_APP_STAGING === 'dev'
                  ? `${process.env.REACT_APP_DEV}uploads/user/avatar.webp`
                  : `${process.env.REACT_APP_PROD}uploads/user/avatar.webp`
              }`}
              alt={decoded.name}
            />
          )}

          <Link to="/profile">{decoded.name}</Link>
          <button title="Logout" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket" />
          </button>
        </div>
      ) : (
        <div className="nav-auth">
          <img src={userIcon} alt="User Icon" />
          <Link to="/login">Login</Link>
        </div>
      )}
    </>
  );
}

export default Auth;

// const isLogin = () => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     const decoded = jwt_decode(token);
//     return (

//     );
//   } else {
//     return (
//       <div className="nav-auth">
//         <img src={userIcon} alt="User Icon" />
//         <Link to="/login">Login</Link>
//       </div>
//     );
//   }
// };
