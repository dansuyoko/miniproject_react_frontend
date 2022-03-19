import React from 'react';
import './style.scss';
import Homepage from './pages';
import Nav from './pages/navbar';
import Login from './pages/login';
import Register from './pages/register';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
