import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../utils/privateRoute';
import ScrollToTop from '../utils/scrollToTop';

import Home from '../pages/main/Home';
import List from '../pages/main/List';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Profile from '../pages/main/Profile';
import ChangePassword from '../pages/main/ChangePassword';
import EditProfile from '../pages/main/EditProfile';
import Add from '../pages/main/AddRecipe';
// import Edit from '../pages/main/EditRecipe';
import Detail from '../pages/main/DetailRecipe';
import Video from '../pages/main/DetailVideo';
import NotFound from '../pages/main/NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="list" element={<List />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="recipe/" element={<PrivateRoute />}>
          <Route index element={<Add />} />
          <Route path="edit/:id" element={<Add edit />} />
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
