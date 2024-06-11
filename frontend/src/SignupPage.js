import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignupPage.css';
import './css/styleguide.css';
import './css/globals.css';
import rectangle77 from './img/rectangle-77.png';
import axios from 'axios';
import api from './api'

const SignupPage = () => {
    const [ID, setID] = useState('');
    const [Password, setPassword] = useState('');
    const [Username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const handleSignupClick = () => {
      navigate('/signup');
    };
    const handleUserlistClick=()=>{
      navigate('/userlist');
    };
    const handlePhotolistClick=()=>{
      navigate('/photolist');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };
    const signup = async () => {
        try {
          if (!ID || !Password || !Username) {
            alert('ID, password and username are required');
            return;
          }
          const response = await axios.post('http://localhost:5000/signup', { username: Username, password: Password, userID: ID });
          if (response.status === 201) {
            alert('User created successfully');
            console.log(response.data.user);
            handleLoginClick();
          }
        } catch (error) {
          if (error.response.status === 409) {
            alert('ID already exists');
          } 
          else if (error.response.status === 410) {
            alert('username already exists');
          } 
          else {
            alert('Signup error');
            console.log(error.response);
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
          <div className="signup screen">
            <div className="view">
              <div className="overlap-group"onClick={handleMainPageClick}>
                <img className="rectangle-78" src={rectangle77} onClick={handleMainPageClick} alt="Rectangle 78" />
              </div>
              <div className="content">
                <div className="frame-8">
                  <h1 className="title valign-text-middle">Create an account</h1>
                  <div className="have-an-account-login">
                    <p className="already-have-an-ccount-log-in">
                      <span className="span0">Already have an account?</span>
                      <span className="poppins-normal-granite-gray-16px">&nbsp;</span>
                      <span className="span2" onClick={handleLoginClick}>Log in</span>
                    </p>
                  </div>
                </div>
                <div className="frame-221">
                  <div className="text-field">
                    <div className="frame-243">
                      <p className="label poppins-normal-granite-gray-16px">What should we call you?</p>
                    </div>
                    <input type="text" className="text-field-1"
                      placeholder="Enter your profile name"
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="text-field">
                    <div className="frame-243">
                      <p className="label poppins-normal-granite-gray-16px">What’s your ID?</p>
                    </div>
                    <input type="text" className="text-field-1"
                      placeholder="Enter your ID"
                      value={ID}
                      onChange={(e) => setID(e.target.value)}
                    />
                  </div>
                  <div className="text-field">
                    <div className="frame-243">
                      <p className="label poppins-normal-granite-gray-16px">Create a password</p>
                    </div>
                    <input type="text" className="text-field-1"
                      placeholder="Enter your password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="error-message valign-text-middle">
                      Use 8 or more characters with a mix of letters, numbers &amp; symbols
                    </p>
                  </div>
                  <div className="frame-222">
                    <div className="button">
                      <div className="frame-276">
                        <div className="sign-up valign-text-middle" onClick={signup}>Create an account</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default SignupPage;
   