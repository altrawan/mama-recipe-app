import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 50px;
  gap: 28px;

  @media screen and (max-width: 576px) {
    margin-left: 0;
    gap: 10px;
    justify-content: center;
  }
`;

const Card = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  min-height: 300px;
  max-height: 500px;
  border-radius: 15px;
  overflow: hidden;
  transition: ease-in-out 150ms;

  &:hover {
    box-shadow: 0 0 12px -2px #000000a0;
    transition: ease-in-out 150ms;
    cursor: pointer;
  }

  @media screen and (max-width: 576px) {
    width: 350px;
    height: 350px;
  }
`;

const CardTitle = styled.h2`
  color: var(--color-3);
  width: 59%;
  text-transform: capitalize;
`;

const CardImage = styled.img`
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: center;
`;

function Cards({ recipes }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipes) {
      setLoading(false);
    }
  }, [recipes]);

  return (
    <Item>
      {loading ? (
        <div />
      ) : (
        recipes.data.map((item) => (
          <div className="d-flex justify-content-center" key={item.id}>
            <Link to={`/recipe/${item.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <div className="w-100 h-100 p-4 d-flex align-items-end">
                  <CardTitle>{item.title}</CardTitle>
                  <CardImage
                    src={`${
                      process.env.REACT_APP_STAGING === 'dev'
                        ? `${process.env.REACT_APP_DEV}uploads/recipe/${item.image}`
                        : `${process.env.REACT_APP_PROD}uploads/recipe/${item.image}`
                    }`}
                    alt={item.title}
                    className="w-100 h-100"
                  />
                </div>
              </Card>
            </Link>
          </div>
        ))
      )}
    </Item>
  );
}

export default Cards;
