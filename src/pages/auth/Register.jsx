import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert';
import Banner from '../../components/Banner';
import AuthStyles from '../../assets/styles/AuthStyles';
import toastr from '../../utils/toastr';
import { register } from '../../store/actions/auth';

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: ''
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Register Page`;
  }, []);

  const onChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, password, passwordConfirmation } = form;
    if (!name || !email || !phone || !password || !passwordConfirmation) {
      Swal('Failed!', 'All data must be filled', 'warning');
    } else if (password !== passwordConfirmation) {
      Swal('Failed!', 'Password confirmation does not match password', 'warning');
    } else {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('passwordConfirmation', passwordConfirmation);
      if (photo) {
        formData.append('image', photo);
      }

      register(formData)
        .then((res) => {
          Swal('Success!', res.message, 'success');
          navigate('/auth/login');
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
          setForm({ password: '', passwordConfirmation: '' });
        });
    }
  };

  return (
    <>
      <AuthStyles />
      <Container fluid>
        <Row>
          <Banner />
          <Col md="8" lg="6" className="custom d-flex justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-xl-6 d-flex flex-column justify-content-center align-items-center p-0">
              <h2 className="main-color title">Let&apos;s Get Started !</h2>
              <span className="secondary-color description mt-4 mb-4">
                Create new account to access all features
              </span>
              <hr className="separator w-100 mb-0 mt-1" />
              <Form
                className="w-100 mb-3 mt-3"
                method="post"
                encType="multipart/form-data"
                onSubmit={onSubmit}>
                <FormGroup className="mb-3 label">
                  <Label for="name" className="mb-2">
                    Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter Name"
                    id="name"
                    className="form-control pt-3 pb-3 pl-3 pr-0 input-auth"
                    onChange={onChangeInput}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-3 label">
                  <Label for="email" className="mb-2">
                    Email Address*
                  </Label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    id="email"
                    className="form-control pt-3 pb-3 pl-3 pr-0 input-auth"
                    onChange={onChangeInput}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-3 label">
                  <Label for="phone" className="mb-2">
                    Phone Number
                  </Label>
                  <Input
                    type="text"
                    placeholder="08xxxxxxxxxx"
                    id="phone"
                    className="form-control pt-3 pb-3 pl-3 pr-0 input-auth"
                    onChange={onChangeInput}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-3 label">
                  <Label htmlFor="password" className="mb-2">
                    Create New Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="Create New Password"
                    id="password"
                    className="form-control pt-3 pb-3 pl-3 pr-0 input-auth"
                    onChange={onChangeInput}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-3 label">
                  <Label htmlFor="passwordConfirmation" className="mb-2">
                    New Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="New Password"
                    id="passwordConfirmation"
                    className="form-control pt-3 pb-3 pl-3 pr-0 input-auth"
                    onChange={onChangeInput}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-3 label">
                  <Label for="photo" className="mb-2">
                    Photo Profile
                  </Label>
                  <Input type="file" onChange={onChangePhoto} required />
                </FormGroup>
                <FormGroup className="mb-4 terms">
                  <Input type="checkbox" className="checkbox" id="checkbox" required />
                  <Label for="checkbox" className="label">
                    I agree to terms & conditions
                  </Label>
                </FormGroup>
                {loading ? (
                  <Button className="w-100 btn-main pt-3 pb-3" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                ) : (
                  <Button type="submit" className="w-100 btn-main pt-3 pb-3">
                    Register Account
                  </Button>
                )}
              </Form>
              <div className="w-100 d-flex flex-column">
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <span className="alternative">
                    Already have account?{' '}
                    <Link to="/auth/login" className="main-color clicked text-decoration-none">
                      Log In Here
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
