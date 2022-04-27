import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AuthStyles from '../../assets/styles/AuthStyles';

import Banner from '../../components/Banner';

toast.configure();

function ForgotPassword() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const onChangeInput = (e, field) => {
    setForm({
      ...form,
      [field]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const body = {
      email,
      password
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}auth/login/`, body)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        swal({
          title: 'Success!',
          text: res.data.message,
          icon: 'success'
        }).then(() => {
          navigate('/');
        });
      })
      .catch((err) => {
        if (err.response.status === 422) {
          const error = err.response.data.errors;
          error.map((e) => {
            return toast.error(e, {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored'
            });
          });
        } else {
          toast.error(err.response.data.message, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          });
        }
      });
  };

  return (
    <>
      <AuthStyles />
      <Container fluid>
        <Row>
          <Banner />
          <Col md="8" lg="6" className="full d-flex justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-xl-6 d-flex flex-column justify-content-center align-items-center p-0">
              <h2 className="main-color title">Forgot Password?</h2>
              <span className="secondary-color description mt-4 mb-4 text-center">
                We just need your registered e-mail address to send your password resend
              </span>
              <hr className="separator w-100 mb-0 mt-1" />
              <Form className="w-100 mb-3 mt-3" onSubmit={(e) => onSubmit(e)}>
                <FormGroup className="mb-3">
                  <Label for="email" className="mb-2 label">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    id="email"
                    className="form-control pt-3 pb-3 pl-3 pr-0 input-auth"
                    onChange={(e) => onChangeInput(e, 'password')}
                    required
                  />
                </FormGroup>
                <Button type="submit" className="w-100 btn-main pt-3 pb-3">
                  Send E-mail
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ForgotPassword;
