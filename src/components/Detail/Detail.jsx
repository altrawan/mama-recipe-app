/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import saved from '../../assets/icons/bookmark.png';
import liked from '../../assets/icons/liked.png';
import play from '../../assets/icons/play.png';

const Section = styled.section`
  margin: 0 auto;
  margin-top: 150px;
  max-width: 800px;

  @media screen and (max-width: 576px) {
    margin-top: 90px;
  }
`;

const Title = styled.h1`
  font-family: 'Airbnb Cereal App Medium';
  color: var(--color-2);
  text-align: center;
  margin-bottom: 60px;

  @media screen and (max-width: 576px) {
  }
`;

const Image = styled.img`
  min-width: 100%;
  min-height: 200px;
  max-height: 500px;
  object-fit: cover;
  object-position: center;
  margin: 0 auto;
  border-radius: 15px !important;
  margin-top: 40px;
`;

const Icon = styled.div`
  z-index: 2;
  right: 30px;
  bottom: 30px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media screen and (max-width: 576px) {
    right: 15px;
    bottom: 15px;
  }
`;

const Saved = styled.div`
  border-radius: 15px !important;
  padding: 9.9px;
  width: 47px;
  background-color: var(--secondary-color);

  &:hover {
    cursor: pointer;
    color: #cea905;
  }
`;

const Liked = styled.div`
  border-radius: 15px !important;
  padding: 6.8px;
  width: 47px;
  background-color: var(--main-color);

  &:hover {
    cursor: pointer;
  }
`;

const Item = styled.div`
  margin: 0 auto;
  margin-top: 40px;
  max-width: 900px;
`;

const Heading = styled.h3`
  font-family: 'Airbnb Cereal App Medium';
  color: var(--color-3);
  margin-bottom: 20px;
`;

const Ingredients = styled.p`
  margin: 0;
  font-family: 'Airbnb Cereal App Light';
  white-space: pre-line;
  text-transform: capitalize;
`;

const Video = styled.button`
  width: 30%;
  height: 50px;
  border: 0;
  border-radius: 10px;
  background-color: #efc81a;
  color: #ffffff;

  &:hover {
    color: #cea905;
    box-shadow: var(--shadow-black-300);
  }

  @media screen and (max-width: 576px) {
    width: 60%;
  }
`;

const Play = styled.img`
  width: 15px;
  height: auto;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -25px;
`;

const Profile = styled.img`
  max-width: 60px;
  min-width: 60px;
  max-height: 60px;
  min-height: 60px;
  object-fit: cover;
  object-position: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
`;

function Detail({ recipe }) {
  return (
    <>
      <Section>
        <Title>{recipe.data.title}</Title>
        <Author>
          {recipe.data.photo ? (
            <Profile
              src={`${
                process.env.REACT_APP_STAGING === 'dev'
                  ? `${process.env.REACT_APP_DEV}uploads/user/${recipe.data.photo}`
                  : `${process.env.REACT_APP_PROD}uploads/user/${recipe.data.photo}`
              }`}
              alt={recipe.data.name}
              className="rounded-circle"
            />
          ) : (
            <Profile
              src={`${
                process.env.REACT_APP_STAGING === 'dev'
                  ? `${process.env.REACT_APP_DEV}uploads/user/avatar.webp`
                  : `${process.env.REACT_APP_PROD}uploads/user/avatar.webp`
              }`}
              alt={recipe.data.name}
              className="rounded-circle"
            />
          )}
          <Info className="h-100">
            <h6>
              By{' '}
              <Link
                to={`/profile/${recipe.data.user_id}`}
                style={{ color: '#000', textDecoration: 'none' }}>
                {recipe.data.name}
              </Link>
            </h6>
            <span title={recipe.data.date}>{moment(recipe.data.date, 'YYYYMMDD').fromNow()}</span>
          </Info>
        </Author>
        <div className="position-relative mb-5 text-center">
          <Image
            src={`${
              process.env.REACT_APP_STAGING === 'dev'
                ? `${process.env.REACT_APP_DEV}uploads/recipe/${recipe.data.image}`
                : `${process.env.REACT_APP_PROD}uploads/recipe/${recipe.data.image}`
            }`}
            alt={recipe.data.title}
          />
          <Icon>
            <Saved>
              <img src={saved} alt="Bookmark" />
            </Saved>
            <Liked>
              <img src={liked} alt="Like" />
            </Liked>
          </Icon>
        </div>
      </Section>

      <Item>
        <Heading>Ingredients</Heading>
        <Ingredients>{recipe.data.ingredients}</Ingredients>
      </Item>
      <Item>
        <Heading>Video Step</Heading>
        <Link to={`/recipe/video/${recipe.data.id}`}>
          <Video>
            <Play src={play} alt="Play" />
          </Video>
        </Link>
      </Item>
    </>
  );
}

export default Detail;
