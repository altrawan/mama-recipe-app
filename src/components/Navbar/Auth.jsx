import React from 'react';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import userIcon from '../../assets/icons/User icon.png';
import User from '../../assets/img/user.png';

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
    navigate('/auth/login');
  };

  return (
    <>
      {isLogin ? (
        <div className={location.pathname === '/' ? 'nav-auth' : 'nav-inverse'}>
          <img
            src={`https://drive.google.com/uc?export=view&id=${decoded.photo}`}
            alt={decoded.name}
            onError={(e) => {
              e.target.src = User;
            }}
          />

          <Link to="/profile">{decoded.name}</Link>
          <button title="Logout" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket" />
          </button>
        </div>
      ) : (
        <div className="nav-auth">
          <img src={userIcon} alt="User Icon" />
          <Link to="/auth/login">Login</Link>
        </div>
      )}
    </>
  );
}

export default Auth;
