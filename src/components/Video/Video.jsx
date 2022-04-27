import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Row } from 'reactstrap';

const Left = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 130px;

  @media screen and (max-width: 576px) {
    margin-left: 25px;
  }
`;

const IFrame = styled.div`
  margin-top: 150px;
  width: 100%;
  height: 250px;

  @media screen and (max-width: 576px) {
    margin: 90px -20px 0 10px;
  }
`;

const Title = styled.h2`
  width: 80%;
  margin-top: 30px;

  font-size: 28px;
  line-height: 30px;
  font-family: 'Airbnb Cereal App Medium';

  @media screen and (max-width: 576px) {
    font-size: 24px;
    margin-top: 10px;
  }
`;

const Date = styled.p`
  font-size: 18px;
  font-family: 'Airbnb Cereal App Medium';
  margin-top: 5px;
  color: #aaaaaa;

  @media screen and (max-width: 576px) {
    font-size: 13px;
    margin-top: -8px;
  }
`;

function Video({ recipe }) {
  useEffect(() => {}, []);

  return (
    <main className="col-12 col-lg-8">
      <Row className="vh-100">
        <Left className="col-12">
          <IFrame className="mx-1 mx-sm-3 mx-md-5">
            <iframe
              src={recipe.data.video}
              title="video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <Title>{recipe.data.title}</Title>
            <Date>{moment(recipe.data.date, 'YYYYMMDD').fromNow()}</Date>
          </IFrame>
        </Left>
      </Row>
    </main>
  );
}

export default Video;
