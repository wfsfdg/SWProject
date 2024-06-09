import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import MainPage from './MainPage';
import LoggedinPage from './LoggedinPage';
import PhotoListPage from './PhotolistPage';
import UserListPage from './UserlistPage';
import PhotoUpload from './PhotoUpload'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/loggedin" element={<LoggedinPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/photolist" element={<PhotoListPage />} />
      <Route path="/userlist" element={<UserListPage />} />
      <Route path="/photoupload" element={<PhotoUpload />} />
    </Routes>
  );
};

export default App;
