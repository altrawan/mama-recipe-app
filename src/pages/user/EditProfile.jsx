import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert';
import jwt_decode from 'jwt-decode';
import Banner from '../../components/Banner';
import { getDetailUser, updateProfile } from '../../store/actions/user';

import AuthStyles from '../../assets/styles/AuthStyles';
import toastr from '../../utils/toastr';

function EditProfile() {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detailUser } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: detailUser.data.name,
    email: detailUser.data.email,
    phone: detailUser.data.phone
  });

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Edit Profile Page`;

    dispatch(getDetailUser(decoded.id));
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      Swal('Failed!', 'All data must be filled', 'warning');
    } else {
      setLoading(true);
      updateProfile(form, decoded.id)
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
      <AuthStyles />
      <Container fluid>
        <Row>
          <Banner />
          <Col md="8" lg="6" className="full d-flex justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-xl-6 d-flex flex-column justify-content-center align-items-center p-0">
              <Form className="w-100 mb-3 mt-3" onSubmit={onSubmit}>
                <FormGroup className="mb-3 label">
                  <Label for="name" className="mb-2">
                    Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter Name"
                    id="name"
                    className="form-control pt-3 pb-3 pl-3 pr-0 input-auth"
                    value={form.name}
                    onChange={onChange}
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
                    value={form.email}
                    onChange={onChange}
                    disabled
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
                    value={form.phone}
                    onChange={onChange}
                    required
                  />
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
                    Update Profile
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

export default EditProfile;
