import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

function Main({ isLogin }) {
  const location = useLocation();

  return (
    <Nav className="me-auto" navbar>
      <NavItem>
        <NavLink tag={Link} to="/" active={location.pathname === '/'}>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/recipe" active={location.pathname === '/recipe'}>
          list recipe
        </NavLink>
      </NavItem>
      {isLogin && (
        <>
          <NavItem>
            <NavLink tag={Link} to="/recipe/add" active={location.pathname === '/recipe/add'}>
              add recipe
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/profile" active={location.pathname === '/profile'}>
              my profile
            </NavLink>
          </NavItem>
        </>
      )}
    </Nav>
  );
}

export default Main;
