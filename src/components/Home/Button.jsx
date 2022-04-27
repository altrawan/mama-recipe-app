import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Btn = styled.button`
  background-color: var(--secondary-color);
  color: var(--color-1);
  padding: 12px 30px;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  text-transform: capitalize;
  transition: all 0.5 ease;
  font-weight: 500;
  text-decoration: none;
  width: 150px;
  text-align: center;
  margin: 10px 0 0 50px;

  &:focus {
    box-shadow: var(--shadow-black-300);
  }

  &:hover {
    cursor: pointer;
    color: var(--main-color);
    background-color: #cea905;
  }

  @media screen and (max-width: 576px) {
    margin: 0 auto;
    display: block;
  }
`;

function Button({ text, link }) {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Btn>{text}</Btn>
    </Link>
  );
}

export default Button;
