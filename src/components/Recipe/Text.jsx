import React from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';

const Custom = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
  background-color: #f6f5f4;
  font-family: 'Airbnb Cereal App Medium';
  border-radius: 15px;
  margin-top: 40px;
  padding-left: 30px;

  @media screen and (max-width: 576px) {
    margin-top: 20px;
  }
`;

function Text({ name, id, value, onChange }) {
  return (
    <Custom>
      <Input
        type="text"
        id={id}
        className="form-control"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none'
        }}
        placeholder={name}
        value={value}
        onChange={onChange}
        required
      />
    </Custom>
  );
}

export default Text;
