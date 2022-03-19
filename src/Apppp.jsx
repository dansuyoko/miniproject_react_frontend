import React from 'react';
import Dashboard from './pages/dashboard';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Catalog from './pages/catalog';
import { Routes, Route, Navigate, BrowserRouter, Outlet } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <p>404 Not Found</p>
      <br />
      return to <a href="/">Homepage</a> ?
    </>
  );
};

const RequireAuth = () => {
  let isAuth = localStorage.getItem('access_token');

  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
