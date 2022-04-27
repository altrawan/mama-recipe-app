import React from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';

const Title = styled.h1`
  font-size: 50px;
  font-family: 'Airbnb Cereal App Medium';
  color: var(--color-2);
  margin: 0 0 20px;
  width: 65%;

  @media screen and (max-width: 1110px) {
    font-size: 40px;
  }

  @media screen and (max-width: 991px) {
    font-size: 38px;
    width: 100%;
  }

  @media screen and (max-width: 576px) {
    text-align: center;
    margin-top: 80px;
    width: 100%;
  }
`;

function TypeWritterText() {
  return (
    <Title>
      <Typewriter
        options={{ autoStart: true, loop: true }}
        onInit={(typewriter) => {
          typewriter
            .typeString('Discover Recipe & Delicious Food')
            .pauseFor(2000)
            .deleteAll()
            .typeString('Eat, Cook, Repeat')
            .pauseFor(2000)
            .deleteAll()
            .typeString('Share Your Best Recipes')
            .pauseFor(2000)
            .deleteAll()
            .start();
        }}
      />
    </Title>
  );
}

export default TypeWritterText;
