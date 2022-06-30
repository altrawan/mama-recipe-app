import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
// import Swal from 'sweetalert';
import ContentLoader from 'react-content-loader';
import { getUserRecipes } from '../../store/actions/recipe';
// import { getListSavedRecipe } from '../../store/actions/savedRecipe';
// import { getListLikedRecipe } from '../../store/actions/likedRecipe';
import MyRecipe from './MyRecipe';
// import SavedRecipe from './SavedRecipe';
// import LikedRecipe from './LikedRecipe';

const Menu = styled.div`
  margin-top: 10px;
  margin-bottom: -70px;
  display: block;
  width: 100%;
  padding: 80px;

  @media screen and (max-width: 576px) {
    margin-top: 20px;
    padding: 10px;
  }
`;

function Tabs({ me, profile }) {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { userRecipes } = useSelector((state) => state);
  // const myRecipe = useSelector((state) => state.recipe);
  // const savedRecipe = useSelector((state) => state.savedRecipe);
  // const likedRecipe = useSelector((state) => state.likedRecipe);
  const [tab, setTab] = useState('');
  const [queryParams] = useSearchParams();

  useEffect(() => {
    const userId = id || decoded.id;
    dispatch(getUserRecipes(userId));
    // dispatch(getListSavedRecipe(userId));
    // dispatch(getListLikedRecipe(userId));
    setTab(queryParams.get('tab'));
  }, [queryParams]);

  return (
    <Menu>
      <Nav tabs>
        <NavItem>
          <NavLink
            tag={Link}
            to={me ? '/profile' : `/profile/${profile.data.id}`}
            className={tab !== 'liked' && tab !== 'saved' ? 'active' : ''}
            onClick={() => setTab('my')}>
            My Recipe
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link}
            to={me ? '/profile?tab=saved' : `/profile/${profile.data.id}?tab=saved`}
            className={tab === 'saved' ? 'active' : ''}
            onClick={() => setTab('saved')}>
            Saved Recipe
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link}
            to={me ? '/profile?tab=liked' : `/profile/${profile.data.id}?tab=liked`}
            className={tab === 'liked' ? 'active' : ''}
            onClick={() => setTab('liked')}>
            Liked Recipe
          </NavLink>
        </NavItem>
      </Nav>
      <hr />
      <TabContent activeTab={tab}>
        {/* {tab === 'saved' &&
          (savedRecipe.isLoading ? (
            <ContentLoader />
          ) : savedRecipe.isError ? (
            swal({
              title: 'Failed!',
              text: savedRecipe.message,
              icon: 'warning'
            })
          ) : (
            <SavedRecipe me={me} savedRecipe={savedRecipe} />
          ))}
        {tab === 'liked' &&
          (likedRecipe.isLoading ? (
            <ContentLoader />
          ) : likedRecipe.isError ? (
            swal({
              title: 'Failed!',
              text: likedRecipe.message,
              icon: 'warning'
            })
          ) : (
            <LikedRecipe me={me} likedRecipe={likedRecipe} />
          ))} */}

        {tab !== 'saved' &&
          tab !== 'liked' &&
          (userRecipes.isLoading ? (
            <ContentLoader />
          ) : userRecipes.data.length ? (
            <MyRecipe me={me} myRecipe={userRecipes} />
          ) : (
            <h4 className="my-4 text-center">You have not created a recipe yet</h4>
          ))}
      </TabContent>
    </Menu>
  );
}

export default Tabs;
