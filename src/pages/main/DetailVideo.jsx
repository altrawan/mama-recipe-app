import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeById } from '../../store/actions/recipe';
import { getListRecipe } from '../../store/actions/listRecipe';

import Navbar from '../../components/Navbar';
import Video from '../../components/Video/Video';
import List from '../../components/Video/List';

const Leftbar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 70px;
  background-color: #efc81a;
  z-index: -1;

  @media screen and (max-width: 576px) {
    top: 600px;
    width: 100%;
  }
`;

function DetailVideo() {
  const token = localStorage.getItem('token');
  const { id } = useParams();

  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe);
  const list = useSelector((state) => state.listRecipe);

  useEffect(() => {
    document.title = 'Mama Recipe. - Detail Video Page';

    dispatch(getRecipeById(id));
    dispatch(getListRecipe(1, 3, 'DESC'));
    console.log(list);
    console.log(recipe);
  }, []);

  return (
    <>
      <Navbar isLogin={token} />

      <Leftbar />
      <Container fluid>
        <Row>
          {recipe.isLoading ? <div /> : <Video recipe={recipe} />}

          {recipe.isLoading ? <div /> : <List recipe={list} />}
        </Row>
      </Container>
    </>
  );
}

export default DetailVideo;
