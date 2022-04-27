import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeById } from '../../store/actions/recipe';
import { getListComment } from '../../store/actions/comment';

import Navbar from '../../components/Navbar';
import Detail from '../../components/Detail/Detail';
import Comment from '../../components/Detail/Comment';
import Footer from '../../components/Footer';

function DetailRecipe() {
  const token = localStorage.getItem('token');
  const { id } = useParams();

  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe);
  const comments = useSelector((state) => state.comment);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Mama Recipe. - Detail Recipe';

    dispatch(getRecipeById(id));
    dispatch(getListComment(id));
    setLoading(false);
  }, []);

  return (
    <>
      <Navbar isLogin={token} />

      <Container fluid>
        <Detail recipe={recipe} />
        <Comment loading={loading} comments={comments} />
      </Container>

      <Footer />
    </>
  );
}

export default DetailRecipe;
