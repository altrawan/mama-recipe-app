import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Container } from 'reactstrap';
import swal from 'sweetalert';
import ContentLoader from 'react-content-loader';
import { useSelector, useDispatch } from 'react-redux';
import icon from '../../assets/icons/edit.svg';
import { getUserById, updatePhoto } from '../../store/actions/user';

import Navbar from '../../components/Navbar';
import Button from '../../components/Profile/Button';
import Tabs from '../../components/Profile/Tabs';
import Footer from '../../components/Footer';

const Section = styled.section`
  margin: 0 auto;
  margin-top: 150px;
  max-width: 800px;

  @media screen and (max-width: 576px) {
    margin-top: 90px;
  }
`;

const Photo = styled.img`
  height: 150px;
  width: 150px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;

const Icon = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;

  &:hover {
    cursor: pointer;
  }
`;

const Username = styled.p`
  font-size: 24px;
  font-family: 'Airbnb Cereal App Medium';
  font-weight: 500;
  text-align: center;
  margin-top: 15px;
`;

function Profile({ me = false }) {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);

  const { id } = useParams();
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    document.title = 'Mama Recipe. - Profile Page';

    const userId = id || decoded.id;
    dispatch(getUserById(userId));
  }, []);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const photo = event.target.files[0];
    const formData = new FormData();
    formData.append('photo', photo);

    updatePhoto(formData, decoded.id)
      .then((res) => {
        swal({
          title: 'Success!',
          text: res.message,
          icon: 'success'
        }).then(() => {
          dispatch(getUserById(decoded.id));
        });
      })
      .catch((err) => {
        swal({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error'
        });
      });
  };

  return (
    <>
      <Navbar isLogin={token} />
      <Container fluid>
        {user.isLoading ? (
          <ContentLoader />
        ) : user.isError ? (
          swal({
            title: 'Failed!',
            text: user.message,
            icon: 'warning'
          })
        ) : (
          <Section>
            <div className="d-flex justify-content-center">
              <div className="position-relative">
                {user.data.photo ? (
                  <Photo
                    src={`${
                      process.env.REACT_APP_STAGING === 'dev'
                        ? `${process.env.REACT_APP_DEV}uploads/user/${user.data.photo}`
                        : `${process.env.REACT_APP_PROD}uploads/user/${user.data.photo}`
                    }`}
                    alt={user.data.name}
                  />
                ) : (
                  <Photo
                    src={`${
                      process.env.REACT_APP_STAGING === 'dev'
                        ? `${process.env.REACT_APP_DEV}uploads/user/avatar.webp`
                        : `${process.env.REACT_APP_PROD}uploads/user/avatar.webp`
                    }`}
                    alt={user.data.name}
                  />
                )}

                {me && <Icon src={icon} alt="Icon" onClick={handleClick} />}

                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
            <Username>{user.data.name}</Username>
            <Button me={me} />
          </Section>
        )}
        <Tabs me={me} profile={user} />
      </Container>
      <Footer />
    </>
  );
}

export default Profile;
