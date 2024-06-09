import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import rectangle77 from './img/rectangle-77.png';
import './css/LoginPage.css'
import './css/globals.css'
import './css/styleguide.css'
import axios from 'axios';
import api from './api'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const LoginPage = () => {
  const [ID, setID] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate('/signup');
  };
  const login = async () => {
    try {
      if (!ID || !Password) {
        alert('Username and password are required');
        return;
      }
      const response = await axios.post('http://localhost:5000/login', { userID: ID, password: Password });
      if (response.status === 200) {
        alert('Login successful');
        navigate('/loggedin');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert('Invalid username or password');
        } else {
          alert(`Unexpected error: ${error.response.status} - ${error.response.data.message}`);
        }
      } else if (error.request) {
        alert('No response from the server. Please try again later.');
      } else {
        alert('Login error. Please check your input and try again.');
      }
    }
  };
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/session', { withCredentials: true });
        if (response.status === 200 && response.data.message) {
          const message = response.data.message;
          if (message.startsWith('Hello ')) {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error('Error fetching session', error);
      }
    };
    fetchSession();
  }, []);
const handleMainPageClick=()=>{
  if (isLoggedIn)
    navigate('/loggedin');
  else
  navigate('/');
}
  return (
    <div className="container-center-horizontal">
      <div className="login screen">
        <div className="view">
          <div className="overlap-group">
            <div className="frame-301">
              <div className="logo" onClick={handleMainPageClick}></div>
              <div className="sign-in">
                <div className="frame-300">
                  <h1 className="title valign-text-middle">Sign in</h1>
                  <div className="frame-297">
                    <div className="frame-297-item">
                      <div className="frame-243"><div className="label">Your ID</div></div>
                      <input type="text" className="text-field" value={ID} onChange={(e) => setID(e.target.value)} />
                    </div>
                    <div className="frame-297-item">
                      <div className="frame-243"><div className="label">Your password</div></div>
                      <input type="password" className="text-field" value={Password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="frame-298">
                      <div className="button" onClick={login}>
                        <div className="frame-276">
                          <div className="sign-up valign-text-middle">Log in</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider-1">
                <div className="divider"></div>
                <div className="or valign-text-middle">New to our community</div>
                <div className="divider"></div>
              </div>
              <div className="button-1">
                <div className="frame-276-1">
                  <div className="sign-up-1 valign-text-middle" onClick={handleSignupClick}>
                    Create an account
                  </div>
                </div>
              </div>
            </div>
            <img className="rectangle-78" src={rectangle77} onClick={handleMainPageClick} alt="Rectangle 78" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
