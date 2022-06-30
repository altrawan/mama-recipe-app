import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailRecipe } from '../../store/actions/recipe';
import { getRecipeComments } from '../../store/actions/comment';
import Navbar from '../../components/Navbar';
import Detail from '../../components/Detail/Detail';
import Comment from '../../components/Detail/Comment';
import Footer from '../../components/Footer';

const DetailRecipe = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailRecipe } = useSelector((state) => state);
  const { recipeComments } = useSelector((state) => state);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Detail Recipe Page`;

    dispatch(getDetailRecipe(id, navigate));
    dispatch(getRecipeComments(id, navigate));
  }, []);

  return (
    <>
      <Navbar />

      <Container fluid>
        <Detail recipe={detailRecipe.data} />
        <Comment comments={recipeComments} />
      </Container>

      <Footer />
    </>
  );
};

export default DetailRecipe;
