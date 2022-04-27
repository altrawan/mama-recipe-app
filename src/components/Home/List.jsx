import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import Card from './Cards';

const Section = styled.section`
  margin-top: 80px;
  @media screen and (max-width: 576px) {
    margin-top: -10px;
  }
`;

const TitleSection = styled.h2`
  border-left: 12px solid var(--secondary-color);
  margin: 0 0 0 50px;
  padding: 15px;
  display: flex;
  font-family: 'Airbnb Cereal App Medium';
  color: var(--color-3);

  @media screen and (max-width: 576px) {
    margin-left: 10px;
  }
`;

function List({ recipes }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Section data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
      <TitleSection className="mb-4 mb-md-5">Latest Recipe</TitleSection>
      <Card recipes={recipes} />
    </Section>
  );
}

export default List;
