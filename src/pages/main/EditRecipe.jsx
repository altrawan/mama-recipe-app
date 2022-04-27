import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form } from 'reactstrap';
import swal from 'sweetalert';
import jwt_decode from 'jwt-decode';
import toastr from '../../utils/toastr';
import { getRecipeById, updateRecipe } from '../../store/actions/recipe';

import Navbar from '../../components/Navbar';
import File from '../../components/Recipe/File';
import Text from '../../components/Recipe/Text';
import Textarea from '../../components/Recipe/Textarea';
import Footer from '../../components/Footer';

const Add = styled.div`
  margin: 0 auto;
  margin-top: 150px;
  max-width: 1000px;

  @media screen and (max-width: 576px) {
    margin-top: 90px;
  }
`;

const Button = styled.button`
  margin-top: 100px;
  margin-bottom: 20px;
  height: 64px;
  width: 426px;
  border-radius: 6px;
  border: none;
  background-color: var(--secondary-color);
  color: var(--color-1);
  font-family: 'Inter', sans-serif;

  &:hover {
    background-color: #cea905;
  }

  @media screen and (max-width: 576px) {
    margin-top: 50px;
    margin-bottom: 0;
  }
`;

const EditRecipe = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const params = useParams();
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [video, setVideo] = useState('');

  useEffect(() => {
    document.title = 'Mama Recipe. - Edit Recipe Page';
    dispatch(getRecipeById(params.id));
    setTitle(recipe.data.title);
    setIngredients(recipe.data.ingredients);
    setVideo(recipe.data.video);
  }, []);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      document.getElementById('customBtn').innerHTML = fileUploaded.name;
      setImage(fileUploaded);
    } else {
      setImage(image);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const decoded = jwt_decode(token);

    formData.append('title', title);
    formData.append('image', image);
    formData.append('ingredients', ingredients);
    formData.append('video', video);
    formData.append('user_id', decoded.id);

    updateRecipe(formData, params.id)
      .then((res) => {
        swal({
          title: 'Success!',
          text: res.message,
          icon: 'success'
        }).then(() => {
          navigate('/profile');
        });
      })
      .catch((err) => {
        if (err.response.status === 422) {
          const error = err.response.data.errors;
          error.map((e) => toastr(e));
        } else {
          toastr(err.response.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar isLogin={token} />

      <Container fluid>
        <Add>
          <div>{title}</div>
          <Form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
            <File
              handleChange={handleChange}
              hiddenFileInput={hiddenFileInput}
              handleClick={handleClick}
            />
            <Text name="Title" value={title || ''} onChange={(e) => setTitle(e.target.value)} />
            <Textarea value={ingredients || ''} onChange={(e) => setIngredients(e.target.value)} />
            <Text name="Video" value={video || ''} onChange={(e) => setVideo(e.target.value)} />
            <div className="d-flex justify-content-center align-items-center pl-5">
              {loading ? (
                <Button type="submit" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <Button type="submit">Update</Button>
              )}
            </div>
          </Form>
        </Add>
      </Container>

      <Footer />
    </>
  );
};

export default EditRecipe;
