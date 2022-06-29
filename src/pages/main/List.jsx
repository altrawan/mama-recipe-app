import React, { useState, useEffect } from 'react';
// import '../../utils/combobox';
// import '../../assets/styles/combobox.css';
import styled from 'styled-components';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'react-paginate';
import { getAllRecipes, getSearchRecipe, getSortRecipe } from '../../store/actions/recipe';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import icon from '../../assets/icons/search.svg';

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

const List = styled.div`
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
  width: 59%;
  text-transform: capitalize;
`;

const CardImage = styled.img`
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: center;
`;

function Search() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe);

  // const [page] = useState(1);
  const [limit] = useState(6);
  const [pageInfo] = useState(recipes.pageInfo.totalPage);
  const [loading, setLoading] = useState(true);

  const [queryParams] = useSearchParams();
  const [querySearch, setQuerySearch] = useState('');
  const queryLimit = queryParams.get('limit');
  const queryPage = queryParams.get('page');
  const querySort = queryParams.get('sort');

  useEffect(() => {
    document.title = 'Mama Recipe. - List Recipe';
    // dispatch(getAllRecipes(page, limit, 'DESC'));
    if (queryParams.get('search')) {
      setQuerySearch(queryParams.get('search'));
      dispatch(getSearchRecipe(queryParams.get('search')));
    }
    if (queryPage || queryLimit) {
      dispatch(getAllRecipes(queryPage, queryLimit, 'DESC'));
    }
    if (querySort) {
      dispatch(getSortRecipe(querySort));
    }
    setLoading(false);
  }, []);

  const handleSort = (event) => {
    const sortValue = event.target.value;
    dispatch(getSortRecipe(sortValue));
    return navigate(`/list?sort=${sortValue}`);
  };

  const handleChangePagination = (event) => {
    const countPage = event.selected + 1;
    dispatch(getAllRecipes(countPage, limit, 'DESC'));
    window.scrollTo(0, 0);
    return navigate(`/list?page=${countPage}&limit=${limit}`);
  };

  const search = (event) => {
    event.preventDefault();
    dispatch(getSearchRecipe(querySearch));
    return navigate(`/list?search=${querySearch}`);
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
              value={querySearch}
              onChange={(e) => setQuerySearch(e.target.value)}
            />
          </Input>
        </form>
      </Main>

      <center>
        <select className="classic" onChange={handleSort}>
          <option hidden>Sort</option>
          <option value="title">Title</option>
          <option value="name">Author</option>
          <option value="date">Date</option>
        </select>
      </center>

      <Latest>
        {/* <TitleSection className="mb-4 mb-md-5">Popular Recipe</TitleSection> */}
        <List>
          {recipes.isLoading || loading ? (
            <ContentLoader />
          ) : recipes.isError ? (
            <h1>{recipes.message}</h1>
          ) : (
            recipes.data.map((item) => (
              <div className="d-flex justify-content-center" key={item.id}>
                <Link to={`/recipe/${item.id}`} style={{ textDecoration: 'none' }}>
                  <Card>
                    <div className="w-100 h-100 p-4 d-flex align-items-end">
                      <CardTitle>{item.title}</CardTitle>
                      <CardImage
                        src={`${
                          process.env.REACT_APP_STAGING === 'dev'
                            ? `${process.env.REACT_APP_DEV}uploads/recipe/${item.image}`
                            : `${process.env.REACT_APP_PROD}uploads/recipe/${item.image}`
                        }`}
                        alt={item.title}
                        className="w-100 h-100"
                      />
                    </div>
                  </Card>
                </Link>
              </div>
            ))
          )}
        </List>

        <div>
          <Pagination
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageInfo}
            initialPage={queryPage || queryLimit ? queryPage - 1 : 0}
            onPageChange={handleChangePagination}
            containerClassName="pagination justify-content-center mt-5"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </Latest>

      <section />

      <Footer />
    </>
  );
}

export default Search;
