
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './css/LoggedinPage.css';
import './css/styleguide.css';
import './css/globals.css';
import rectangle77 from './img/rectangle-77.png';
import icons from './img/icons.svg';
import image1 from './img/image-1.png';
import image5 from './img/image-4.png';
import axios from 'axios';

const LoggedinPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/session', { withCredentials: true });
        if (response.status === 200 && response.data.message) {
          const message = response.data.message;
          if (message.startsWith('Hello ')) {
            const user = message.replace('Hello ', '').trim(); // "Hello " 이후의 username 추출
            setUsername(user);
          }
        }
      } catch (error) {
        console.error('Error fetching session', error);
      }
    };
    fetchSession();
  }, []);
  
  const handlePhotolistClick=()=>{
    navigate('/photolist');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        alert('logout success');
        navigate('/main');
      }
    } catch (error) {
      console.error('Logout error', error);
      alert('Logout error');
    }
  };

  return (
    <div className="container-center-horizontal">
      <div className="LoggedinPage screen">
        <div className="header-nav">
          <div className="flex-row">
            <img className="rectangle-77" src={rectangle77} alt="Rectangle 77" />
            <div className="links">
              <div className="place">Home</div>
              <div className="x-list">User List</div>
              <div className="x-list" onClick={handlePhotolistClick}>Photo List</div>
            </div>
            <div className="login-sign-up">
            <div className="welcome-message">
                Hello, {username}
                </div>
              <article className="button">
                <div className="frame-276">
                  <img className="icons" src={icons} alt="Icons" />
                </div>
              </article>
              <article className="button-1">
                <div className="frame-276-1">
                  <div className="sign-up valign-text-middle" onClick={handleLogout}>Log out</div>
                </div>
              </article>
            </div>
          </div>
          <div className="divider-1"></div>
        </div>
        <div className="view">
          <div className="flex-row-1">
            <div className="content">
              <div className="frame-45">
                <h1 className="title valign-text-middle">Take a picture</h1>
                <div className="keep-a-diary valign-text-middle">Keep a diary</div>
              </div>
              <div className="frame-14559">
                <div className="rectangle-76"></div>
                <div className="frame-14568">
                  <p className="x valign-text-middle">
                    Your own story that records with photos, 'Photo Diary'<br />
                    Our daily lives go by quickly, and precious moments are often forgettable. We want to capture personal photo diaries into the digital world.<br />
                    "Photo Diary" isn't just a photo repository. It's a space where you can express your thoughts, emotions, and moments in pictures and texts, and communicate with other users.
                  </p>
                  <div className="primary-button"><div className="get-started">Get started</div></div>
                </div>
              </div>
            </div>
            <img className="image-1" src={image1} alt="image 1" />
          </div>
          <div className="card">
            <div className="frame-14560">
              <div className="frame-14565">
                <div className="x-list-1">User List</div>
                <p className="text_label">Click to view the list of users</p>
              </div>
            </div>
            <div className="frame-14561">
              <div className="frame-14565">
                <div className="x-list-1"onClick={handlePhotolistClick}>Photo List</div>
                <p className="text_label-1">Click to check the list of photos</p>
              </div>
            </div>
          </div>
        </div>
        <div className="group-7">
          <div className="overlap-group">
            <footer className="footer">
              <div className="frame-275">
                <div className="divider"></div>
                <div className="frame-274">
                  <div className="frame-269">
                    <div className="frame-268">
                      <div className="product valign-text-middle">Developer</div>
                      <div className="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">Lee Seunghyun</div>
                      <div className="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">2022112088</div>
                      <div className="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">Choi Yoongi</div>
                      <div className="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">2019112156</div>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="group-6">
                  <div className="frame-272">
                    <div className="copyright-2022 valign-text-middle">@software engineering 2024</div>
                  </div>
                </div>
              </div>
            </footer>
            <img className="image-5" src={image5} alt="image 5" />
          </div>
        </div>
      </div>
    </div>
  );
};


export default LoggedinPage;
