import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import jwt_decode from 'jwt-decode';
import Banner from '../../components/Banner';
import { getUserById, updateProfile } from '../../store/actions/user';

import AuthStyles from '../../assets/styles/AuthStyles';
import toastr from '../../utils/toastr';

function EditProfile() {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    document.title = 'Mama Recipe. - Edit Profile Page';

    dispatch(getUserById(decoded.id));
    setName(user.data.name);
    setEmail(user.data.email);
    setPhone(user.data.phone);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = {
      name,
      email,
      phone
    };

    updateProfile(form, decoded.id)
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                  <Button type="submit" className="w-100 btn-main pt-3 pb-3" disabled>
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
