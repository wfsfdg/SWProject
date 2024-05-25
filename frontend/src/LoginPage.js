import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // LoginPage 컴포넌트에 대한 CSS 파일 import
import { Link } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

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

  return (
    <div className="login-container">
      <div className="Frame301">
        <div className="Logo" />
        <div className="SignIn">
          <div className="Frame300">
            <div className="SignInText">Sign in</div>
            <div className="Frame297">
              <div className="Email">
                <div className="Frame243">
                  <div className="Label">Your ID</div>
                </div>
                <div className="TextField" />
              </div>
              <div className="TextField">
                <div className="Frame243">
                  <div className="Label">Your password</div>
                </div>
                <div className="TextField" />
              </div>
              <div className="Frame298">
                <div className="Button">
                  <button className="Frame276">
                    <div className="LogInText">Log in</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Divider">
          <div className="DividerLine"></div>
          <div className="Or">New to our community</div>
          <div className="DividerLine"></div>
        </div>
        <div className="SignUpButton">
          <button className="Frame276">
            <div className="SignUpText">Create an account</div>
          </button>
        </div>
      </div>
      <img className="Rectangle78" src="https://via.placeholder.com/40x40" />
    </div>
  );
}

export default LoginPage;
