import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Container } from 'reactstrap';
import Swal from 'sweetalert';
import { Instagram } from 'react-content-loader';
import { useSelector, useDispatch } from 'react-redux';
import icon from '../../assets/icons/edit.svg';
import { getDetailUser, updatePhoto } from '../../store/actions/user';
import User from '../../assets/img/user.png';
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
  const { detailUser } = useSelector((state) => state);
  const hiddenFileInput = useRef(null);
  const [photoLoading, setPhotoLoading] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - ${me ? 'My Profile' : 'Profile'}`;

    const userId = id || decoded.id;
    dispatch(getDetailUser(userId));
  }, []);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const photo = event.target.files[0];
    const formData = new FormData();
    if (photo) {
      formData.append('image', photo);
    }

    setPhotoLoading(true);
    updatePhoto(formData, decoded.id)
      .then((res) => {
        Swal('Success!', res.message, 'success').then(() => {
          dispatch(getDetailUser(decoded.id));
        });
      })
      .catch((err) => {
        Swal('Error!', err.message, 'error');
      })
      .finally(() => {
        setPhotoLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <Container fluid>
        {detailUser.isLoading ? (
          <Instagram />
        ) : detailUser.isError ? (
          <div>Error</div>
        ) : (
          <Section>
            <div className="d-flex justify-content-center">
              <div className="position-relative">
                {photoLoading ? (
                  <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <Photo
                    src={`https://drive.google.com/uc?export=view&id=${detailUser.data.photo}`}
                    alt={detailUser.data.name}
                    onError={(e) => {
                      e.target.src = User;
                    }}
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
            <Username>{detailUser.data.name}</Username>
            <Button me={me} />
          </Section>
        )}
        <Tabs me={me} profile={detailUser} />
      </Container>
      <Footer />
    </>
  );
}

export default Profile;
