import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TabPane, Row, Col, Card, CardBody } from 'reactstrap';
import swal from 'sweetalert';
import { deleteRecipe } from '../../store/actions/recipe';
import { useDispatch } from 'react-redux';
import { getUserRecipes } from '../../store/actions/recipe';
import jwt_decode from 'jwt-decode';
import Default from '../../assets/img/default.jpg';

const Image = styled.img`
  width: 270px;
  height: 180px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
`;

const Title = styled.p`
  font-size: 24px;
  font-family: 'Airbnb Cereal App Medium';
  color: var(--color-5);
  background-color: var(--secondary-color);
  position: absolute;
  bottom: 0;
  left: 15px;
`;

const Option = styled.div`
  position: absolute;
  top: 10px;
  right: 0;

  @media screen and (max-width: 576px) {
    top: 10px;
    right: 70px;
  }
`;

function MyRecipe({ me, myRecipe }) {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (myRecipe) {
      setLoading(false);
    }
  }, []);

  const remove = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this recipe',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        deleteRecipe(id)
          .then((res) => {
            swal({
              title: 'Success!',
              text: res.message,
              icon: 'success'
            });
            dispatch(getUserRecipes(decoded.id));
          })
          .catch((err) => {
            swal({
              title: 'Failed!',
              text: err.response.data.message,
              icon: 'error'
            });
          });
      }
    });
  };
  return (
    <TabPane tabId="my">
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-2 gx-4 mt-4 ml-5">
        {loading ? (
          <div />
        ) : (
          myRecipe.data.map((item) => (
            <Col key={item.id}>
              <Card className="border-0">
                <CardBody className="p-0">
                  <Image
                    src={`https://drive.google.com/uc?export=view&id=${item.image}`}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = Default;
                    }}
                  />
                  <Title className="p-1 rounded">{item.title}</Title>
                  <Option>
                    <Link to={`/recipe/${item.id}`} className="btn-view">
                      <i className="fa-solid fa-eye" title="View Recipe" />
                    </Link>
                    {me && (
                      <>
                        <Link to={`/recipe/edit/${item.id}`} className="btn-edit">
                          <i className="far fa-edit" title="Edit Recipe" />
                        </Link>
                        <button onClick={() => remove(item.id)} className="btn-delete">
                          <i className="far fa-trash-can" title="Delete Recipe" />
                        </button>
                      </>
                    )}
                  </Option>
                </CardBody>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </TabPane>
  );
}

export default MyRecipe;
