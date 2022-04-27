import React from 'react';
import styled from 'styled-components';
import icon from '../../assets/icons/image.png';

const Image = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  height: 480px;
  background-color: #f6f5f4;
  border-radius: 15px;

  @media screen and (max-width: 576px) {
    height: 280px;
  }
`;

const Custom = styled.div`
  background-color: transparent;
  font-family: 'Airbnb Cereal App Medium';
  width: 150px;
  padding: 10px;
  text-align: center;
  color: #666666;
  font-size: 20px;
  cursor: pointer;
`;

function File({ handleChange, hiddenFileInput, handleClick }) {
  return (
    <Image>
      <img src={icon} alt="Icon" />
      <Custom id="customBtn" onClick={handleClick}>
        Add Photo
      </Custom>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </Image>
  );
}

export default File;
