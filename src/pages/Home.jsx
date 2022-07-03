import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { getLatestRecipe } from '../store/actions/recipe';
// Import Component
import Navbar from '../components/Navbar';
import Hero from '../components/Home/Hero';
import Popular from '../components/Home/Popular';
import Latest from '../components/Home/Latest';
import List from '../components/Home/List';
import Footer from '../components/Footer';

const RightBar = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 740px;
  width: 350px;
  background-color: var(--secondary-color);
  z-index: -1;

  @media screen and (max-width: 991px) {
    width: 250px;
  }

  @media screen and (max-width: 767px) {
    width: 150px;
  }

  @media screen and (max-width: 450px) {
    width: 50px;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const { latestRecipe } = useSelector((state) => state);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Landing Page`;

    dispatch(getLatestRecipe(6));
  }, [dispatch]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <RightBar />
      <Hero />
      {latestRecipe.isLoading ? (
        <ContentLoader />
      ) : latestRecipe.isError ? (
        <div>Error</div>
      ) : (
        <Popular recipes={latestRecipe} />
      )}
      {latestRecipe.isLoading ? (
        <ContentLoader />
      ) : latestRecipe.isError ? (
        <div>Error</div>
      ) : (
        <Latest recipes={latestRecipe} />
      )}
      {latestRecipe.isLoading ? (
        <ContentLoader />
      ) : latestRecipe.isError ? (
        <div>Error</div>
      ) : (
        <List recipes={latestRecipe} />
      )}

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
