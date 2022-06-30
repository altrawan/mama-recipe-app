import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import ScrollToTop from '../utils/scrollToTop';

// Main
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

// Auth
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Forgot from '../pages/auth/Forgot';
import Verification from '../pages/auth/Verification';
import Reset from '../pages/auth/Reset';

// Recipe
import Add from '../pages/recipe/Add';
import Detail from '../pages/recipe/Detail';
import Edit from '../pages/recipe/Edit';
import List from '../pages/recipe/List';
import Video from '../pages/recipe/Video';

// User
import Profile from '../pages/user/Profile';
import ChangePassword from '../pages/user/ChangePassword';
import EditProfile from '../pages/user/EditProfile';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="auth/" element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="verification" element={<Verification />} />
          <Route path="reset/:token" element={<Reset />} />
        </Route>
        <Route path="recipe/" element={<PrivateRoute />}>
          <Route index element={<List />} />
          <Route path="add" element={<Add />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path=":id" element={<Detail />} />
          <Route path="video/:id" element={<Video />} />
        </Route>
        <Route path="profile/" element={<PrivateRoute />}>
          <Route index element={<Profile me />} />
          <Route path=":id" element={<Profile />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path="password" element={<ChangePassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default Router;
