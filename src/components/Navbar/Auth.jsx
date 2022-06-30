import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailUser } from '../../store/actions/user';
import userIcon from '../../assets/icons/User icon.png';
import User from '../../assets/img/user.png';

function Auth({ isLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detailUser } = useSelector((state) => state);

  // Decoded Token
  let decoded = '';
  if (isLogin) {
    decoded = jwt_decode(localStorage.getItem('token'));
  }

  const logout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  useEffect(() => {
    dispatch(getDetailUser(decoded.id));
  }, []);

  return (
    <>
      {isLogin ? (
        <div className={location.pathname === '/' ? 'nav-auth' : 'nav-inverse'}>
          <img
            src={`https://drive.google.com/uc?export=view&id=${detailUser.data.photo}`}
            alt={detailUser.data.name}
            onError={(e) => {
              e.target.src = User;
            }}
          />

          <Link to="/profile">{detailUser.data.name}</Link>
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
