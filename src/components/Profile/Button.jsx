import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Action = styled.div`
  margin: 0 auto;
  width: 320px;
  height: 80px;
  border-radius: 15px;
  background-color: #e7e7e7;
  position: relative;
  transition: 0.5s;
`;

const Btn = styled.button`
  border: none;
  width: 320px;
  height: 40px;
  background-color: none;
  color: #3f3a3a;
  font-size: 14px;
  border-radius: 15px;
`;

function Button({ me }) {
  return (
    <>
      {me && (
        <Action className="mx-auto">
          <Link to="/profile/edit" style={{ textDecoration: 'none' }}>
            <Btn className="d-block">Edit Profile</Btn>
          </Link>
          <Link to="/profile/password" style={{ textDecoration: 'none' }}>
            <Btn className="d-block">Change Password</Btn>
          </Link>
        </Action>
      )}
    </>
  );
}

export default Button;
