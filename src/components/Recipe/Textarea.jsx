import React from 'react';
import styled from 'styled-components';

const Custom = styled.div`
  display: flex;
  justify-content: center;
  height: 380px;
  background-color: #f6f5f4;
  font-family: 'Airbnb Cereal App Medium';
  border-radius: 15px;
  margin-top: 40px;
  padding-left: 30px;

  @media screen and (max-width: 576px) {
    height: 180px;
    margin-top: 20px;
  }
`;

function Textarea({ value, onChange }) {
  return (
    <Custom className="p-4">
      <textarea
        className="form-control"
        placeholder="Ingredients"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none'
        }}
        value={value}
        onChange={onChange}
        required
      />
    </Custom>
  );
}

export default Textarea;
