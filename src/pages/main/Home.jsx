import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import ContentLoader from 'react-content-loader';
import swal from 'sweetalert';
import { getAllRecipes } from '../../store/actions/recipe';
// Import Component
import Navbar from '../../components/Navbar';
import Hero from '../../components/Home/Hero';
import Popular from '../../components/Home/Popular';
import Latest from '../../components/Home/Latest';
import List from '../../components/Home/List';
import Footer from '../../components/Footer';

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

function Home() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe);

  useEffect(() => {
    document.title = 'Mama Recipe. - Landing Page';

    dispatch(getAllRecipes(1, 6, 'DESC'));
  }, [dispatch]);

  const search = (e, query) => {
    e.preventDefault();
    return navigate(`/list?search=${query}`);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar isLogin={token} />

      {/* Content */}
      <RightBar />
      <Hero search={search} />
      {recipes.isLoading ? (
        <ContentLoader />
      ) : recipes.isError ? (
        swal({
          title: 'Failed!',
          text: recipes.message,
          icon: 'warning'
        })
      ) : (
        <Popular recipes={recipes} />
      )}
      {recipes.isLoading ? (
        <ContentLoader />
      ) : recipes.isError ? (
        swal({
          title: 'Failed!',
          text: recipes.message,
          icon: 'warning'
        })
      ) : (
        <Latest recipes={recipes} />
      )}
      {recipes.isLoading ? (
        <ContentLoader />
      ) : recipes.isLoading ? (
        swal({
          title: 'Failed!',
          text: recipes.message,
          icon: 'warning'
        })
      ) : (
        <List recipes={recipes} />
      )}

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
