import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { useSelector, useDispatch } from 'react-redux';
import { getListRecipe } from '../../store/actions/recipe';

import Navbar from '../../components/Navbar';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';
import icon from '../../assets/icons/search.svg';
import Default from '../../assets/img/default.jpg';

const Main = styled.main`
  margin-top: 120px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  @media screen and (max-width: 576px) {
    margin-top: 90px;
  }
`;

const Input = styled.div`
  border-radius: 10px;
  width: 1000px;
  display: flex;
  align-items: center;
  background-color: #efefef;

  @media screen and (max-width: 576px) {
    width: 350px;
  }
`;

const Icon = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Latest = styled.section`
  margin-top: 50px;

  @media screen and (max-width: 576px) {
    margin-top: 30px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 50px;
  gap: 28px;

  @media screen and (max-width: 576px) {
    margin-left: 0;
    gap: 10px;
    justify-content: center;
  }
`;

const Card = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  min-height: 300px;
  max-height: 500px;
  border-radius: 15px;
  overflow: hidden;
  transition: ease-in-out 150ms;

  &:hover {
    box-shadow: 0 0 12px -2px #000000a0;
    transition: ease-in-out 150ms;
    cursor: pointer;
  }

  @media screen and (max-width: 576px) {
    width: 350px;
    height: 350px;
  }
`;

const CardTitle = styled.h2`
  color: var(--color-3);
  /* width: 59%; */
  text-transform: capitalize;
  background-color: var(--secondary-color);
  border-radius: 5px;
  padding: 0 5px;
`;

const CardImage = styled.img`
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: center;
`;

const Button = styled.button`
  background-color: var(--secondary-color);
  color: var(--color-1);
  padding: 0 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  text-transform: capitalize;
  transition: all 0.5 ease;
  font-weight: 500;
  text-decoration: none;
  text-align: center;

  &:focus {
    box-shadow: var(--shadow-black-300);
  }

  &:hover {
    cursor: pointer;
    color: var(--main-color);
    background-color: #cea905;
  }

  @media screen and (max-width: 576px) {
    margin: 0 auto;
    display: block;
  }
`;

const List = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listRecipe } = useSelector((state) => state);

  const [queryParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [limitQuery, setLimitQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - List Page`;
  }, []);

  useEffect(() => {
    let url = `recipe?`;

    setSearchQuery('');
    if (queryParams.get('search')) {
      setSearchQuery(queryParams.get('search'));
      url += `&search=${queryParams.get('search')}`;
    }

    setLimitQuery('');
    if (queryParams.get('limit')) {
      setLimitQuery(queryParams.get('limit'));
      url += `&limit=${queryParams.get('limit')}`;
    }

    setSortQuery('');
    if (queryParams.get('sort')) {
      setSortQuery(queryParams.get('sort'));
      url += `&sort=${queryParams.get('sort')}`;
    }

    if (queryParams.get('page')) {
      url += `&page=${queryParams.get('page')}`;
    }

    dispatch(getListRecipe(url, navigate));
  }, [dispatch, navigate, queryParams]);

  const applyFilter = (page = '') => {
    let url = '/recipe?';
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }
    if (limitQuery) {
      url += `&limit=${limitQuery}`;
    }
    if (sortQuery) {
      url += `&sort=${sortQuery}`;
    }
    if (page) {
      url += `&page=${page}`;
    }

    return navigate(url);
  };

  const search = (e) => {
    e.preventDefault();

    applyFilter();
  };

  return (
    <>
      <Navbar isLogin={token} />
      <Main>
        <form onSubmit={search}>
          <Input className="p-3 pl-4">
            <Icon>
              <img src={icon} alt="Search" />
            </Icon>
            <input
              type="search"
              className="form-control"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              placeholder="Search Restaurant, Food"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Input>
        </form>
      </Main>

      <div className="row mx-auto" style={{ maxWidth: '1000px' }}>
        <div className="col-12 col-sm-6">
          <form className="d-flex my-2" onSubmit={search}>
            <select
              className="form-select form-select-md"
              onChange={(e) => setSortQuery(e.target.value)}
              value={sortQuery}>
              <option value="">Sort By</option>
              <option value="title">Title</option>
              <option value="date">Date</option>
            </select>
            <Button className="ms-2" type="submit">
              Sort
            </Button>
          </form>
        </div>
        <div className="col-12 col-sm-6">
          <form className="d-flex my-2" onSubmit={search}>
            <select
              className="form-select form-select-md"
              onChange={(e) => setLimitQuery(e.target.value)}
              value={limitQuery}>
              <option value="">Limit</option>
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="18">18</option>
              <option value="24">24</option>
            </select>
            <Button className="ms-2" type="submit">
              Limit
            </Button>
          </form>
        </div>
      </div>

      <Latest>
        <Section>
          {listRecipe.isLoading ? (
            <ContentLoader />
          ) : listRecipe.isError ? (
            <h2 className="text-center">{listRecipe.message}</h2>
          ) : (
            <>
              {listRecipe.data.length ? (
                listRecipe.data.map((item) => (
                  <>
                    <div className="d-flex justify-content-center" key={item.id}>
                      <Link to={`/recipe/${item.id}`} style={{ textDecoration: 'none' }}>
                        <Card>
                          <div className="w-100 h-100 p-4 d-flex align-items-end">
                            <CardTitle>{item.title}</CardTitle>
                            <CardImage
                              src={`https://drive.google.com/uc?export=view&id=${item.image}`}
                              alt={item.title}
                              className="w-100 h-100"
                              onError={(e) => {
                                e.target.src = Default;
                              }}
                            />
                          </div>
                        </Card>
                      </Link>
                    </div>
                  </>
                ))
              ) : (
                <h2 className="text-center">Recipe not found</h2>
              )}
            </>
          )}
        </Section>
      </Latest>
      {listRecipe.data.length && (
        <Pagination pagination={listRecipe.pagination} applyFilter={applyFilter} />
      )}

      <section />

      <Footer />
    </>
  );
};

export default List;
