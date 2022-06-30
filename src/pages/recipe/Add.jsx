import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'reactstrap';
import Swal from 'sweetalert';
import toastr from '../../utils/toastr';
import { createRecipe } from '../../store/actions/recipe';

import Navbar from '../../components/Navbar';
import File from '../../components/Recipe/File';
import Text from '../../components/Recipe/Text';
import Textarea from '../../components/Recipe/Textarea';
import Footer from '../../components/Footer';

const Section = styled.div`
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

const Add = () => {
  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    video: ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Add Recipe Page`;
  }, []);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    document.getElementById('customBtn').innerHTML = fileUploaded.name;
    setImage(fileUploaded);
  };

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append('title', form.title);
    formData.append('ingredients', form.ingredients);
    formData.append('video', form.video);

    if (image) {
      formData.append('image', image);
    }

    if (!form.title || !form.ingredients || !form.video) {
      Swal('Failed!', 'All data must be filled', 'warning');
    } else {
      createRecipe(formData)
        .then((res) => {
          Swal('Success!', res.message, 'success').then(() => {
            navigate('/profile');
          });
        })
        .catch((err) => {
          if (err.response.data.code === 422) {
            const { error } = err.response.data;
            error.map((el) => toastr(el, 'error'));
          } else {
            Swal('Error!', err.response.data.message, 'error');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Navbar />

      <Container fluid>
        <Section>
          <Form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
            <File
              handleChange={handleChange}
              hiddenFileInput={hiddenFileInput}
              handleClick={handleClick}
            />
            <Text name="Title" id="title" value={form.title} onChange={handleInput} />
            <Textarea id="ingredients" value={form.ingredients} onChange={handleInput} />
            <Text name="Video" id="video" value={form.video} onChange={handleInput} />
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
                <Button type="submit">Post</Button>
              )}
            </div>
          </Form>
        </Section>
      </Container>

      <Footer />
    </>
  );
};

export default Add;
