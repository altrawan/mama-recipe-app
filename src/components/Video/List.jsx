/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

const Side = styled.div`
  margin-top: 150px;
  margin-left: 30px;
`;

const Other = styled.h4`
  font-family: 'Airbnb Cereal App Bold';
`;

const Image = styled.img`
  border-radius: 7px;
  object-fit: cover;
  object-position: center;
  width: 300px;
  height: 200px;
`;

const Name = styled.h5`
  margin-top: 7px;
  margin-left: -15px;
  font-size: 22px;
  line-height: 0px;
  font-family: 'Airbnb Cereal App Medium';

  &:hover {
    color: var(--secondary-color);
  }
`;

const Author = styled.p`
  margin-top: 15px;
  margin-left: -15px;
  font-size: 13px;
  color: #aaaaaa;
  font-family: 'Airbnb Cereal App Medium';
`;

function List({ recipe }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipe) {
      setLoading(false);
    }
  }, []);

  return (
    <aside className="col-lg-4 d-none d-lg-block">
      <Side>
        <Other>Other Recipe</Other>
        {loading ? (
          <div>Loading</div>
        ) : (
          recipe.data.map((e, i) => (
            <Card className="border-0" key={i}>
              <Link to={`/recipe/${e.id}`}>
                <Image
                  src={`${
                    process.env.REACT_APP_STAGING === 'dev'
                      ? `${process.env.REACT_APP_DEV}uploads/recipe/${e.image}`
                      : `${process.env.REACT_APP_PROD}uploads/recipe/${e.image}`
                  }`}
                  alt={e.title}
                />
              </Link>

              <CardBody>
                <Link to={`/recipe/${e.id}`} style={{ color: '#000', textDecoration: 'none' }}>
                  <Name>{e.title}</Name>
                </Link>
                <Author>
                  <Link
                    to={`/profile/${e.user_id}`}
                    style={{ color: '#AAA', textDecoration: 'none' }}>
                    {e.name}{' '}
                  </Link>{' '}
                  - {moment(e.date, 'YYYYMMDD').fromNow()}
                </Author>
              </CardBody>
            </Card>
          ))
        )}
      </Side>
    </aside>
  );
}

export default List;
