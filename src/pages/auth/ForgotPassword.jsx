import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert';
import toastr from '../../utils/toastr';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AuthStyles from '../../assets/styles/AuthStyles';
import Banner from '../../components/Banner';
import { forgot } from '../../store/actions/auth';

function ForgotPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} - Forgot Password Page`;
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire('Failed!', 'Email must be filled', 'warning');
    } else {
      setLoading(true);

      forgot({ email })
        .then((res) => {
          Swal('Success!', res.message, 'success');
          navigate('/auth/verification');
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
          setEmail('');
        });
    }
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
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
                    Send E-mail
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

export default ForgotPassword;
