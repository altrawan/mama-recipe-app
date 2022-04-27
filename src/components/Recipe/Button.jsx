import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  margin-top: 100px;
  margin-bottom: 20px;
  height: 64px;
  width: 426px;
  border-radius: 6px;
  border: none;
  background-color: var(--secondary-color);
  color: var(--color-1);
  font-family: 'Inter', sans-serif;

  &:hover {
    background-color: #cea905;
  }

  @media screen and (max-width: 576px) {
    margin-top: 50px;
    margin-bottom: 0;
  }
`;

function Button({ text }) {
  return (
    <div className="d-flex justify-content-center align-items-center pl-5">
      <Btn type="submit">{text}</Btn>
    </div>
  );
}

export default Button;
