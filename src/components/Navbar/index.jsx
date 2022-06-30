/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Container, Navbar, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';
import Main from './Main';
import Auth from './Auth';
import '../../utils/navbar';

function Navigation() {
  // Collapse isOpen State
  const isLogin = Boolean(localStorage.getItem('token'));
  const [isOpen, setIsOpen] = useState(false);

  console.log(isLogin);

  return (
    <Navbar expand="lg" className="fixed-top">
      <Container>
        <NavbarBrand href="/" className="d-md-none">
          <img src="" alt="" width="" height="" />
          <span>Mama Recipe.</span>
        </NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}>
          <i className="fas fa-bars" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Main isLogin={isLogin} />
          <Auth isLogin={isLogin} />
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
