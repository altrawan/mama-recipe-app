import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert';
import Banner from '../../components/Banner';
import AuthStyles from '../../assets/styles/AuthStyles';
import toastr from '../../utils/toastr';
import { verification } from '../../store/actions/auth';

const Verification = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Verification Code Page`;
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!verifyCode) {
      Swal('Failed!', 'Code must be filled', 'warning');
    } else {
      setLoading(true);

      verification({ verifyCode })
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
          setVerifyCode('');
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
              <Form className="w-100 mb-3 mt-3" onSubmit={onSubmit}>
                <FormGroup className="mb-3">
                  <Label for="code" className="mb-2 label">
                    Code 6 Digit
                  </Label>
                  <Input
                    type="text"
                    placeholder="Code Digit"
                    id="code"
                    className="form-control pt-3 pb-3 pl-3 pr-0 input-auth"
                    onChange={(e) => setVerifyCode(e.target.value)}
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
};

export default Verification;
