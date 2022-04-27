import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import swal from 'sweetalert';
import jwt_decode from 'jwt-decode';
import Banner from '../../components/Banner';
import axios from '../../utils/axios';
import AuthStyles from '../../assets/styles/AuthStyles';
import toastr from '../../utils/toastr';

function ChangePassword() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    newPassword: '',
    passwordConfirmation: ''
  });

  useEffect(() => {
    document.title = 'Mama Recipe. - Change Password Page';
  }, [navigate, token]);

  const onChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const decoded = jwt_decode(token);
    setLoading(true);

    axios
      .put(`user/password/${decoded.id}`, form)
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
        setLoading(false);
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
              <Form className="w-100 mb-3 mt-3" onSubmit={onSubmit}>
                <FormGroup className="mb-3">
                  <Label for="code" className="mb-2 label">
                    Code Digit
                  </Label>
                  <Input
                    type="number"
                    placeholder="Code Digit"
                    id="code"
                    className="form-control pt-3 pb-3 pl-3 pr-0 input-auth"
                    onChange={onChangeInput}
                    required
                  />
                </FormGroup>
                {loading ? (
                  <Button type="submit" className="w-100 btn-main pt-3 pb-3" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                ) : (
                  <Button type="submit" className="w-100 btn-main pt-3 pb-3">
                    Reset Password
                  </Button>
                )}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ChangePassword;
