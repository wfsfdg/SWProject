import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from './image/logo.png'

function LoginPage() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      if(!Password||!Username)
        {
          alert('Username and password are required');
          return;
        }
      const response = await axios.post('http://localhost:5000/login', { username: Username, password: Password });
      if (response.status === 200) {
        alert('Login successful');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert('Login error');
    }
  };
  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (<div className="login-page">
  <div className="frame301">
    <div className="logo">
    <img className="rectangle78" src={logo} alt="Logo" />
    </div>
    <div className="sign-in">
      <h2>Sign in</h2>
      <form onSubmit={login}>
        <div className="text-field">
          <label htmlFor="user-id">Your ID</label>
          <input type="text" id="user-id" name="user-id" value={Username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="text-field">
          <label htmlFor="password">Your password</label>
          <input type="password" id="password" name="password" value={Password} onChange={(e) => setPassword(e.target.value)}required />
        </div>
        <button type="submit" className="login-button">Log in</button>
      </form>
      <div className="divider">
        <div className="line"></div>
        <span>New to our community</span>
        <div className="line"></div>
      </div>
      <button className="signup-button" onClick={handleSignupClick}>Create an account</button>
    </div>
  </div>
</div>
);
};


export default LoginPage;
