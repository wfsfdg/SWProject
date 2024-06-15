import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/MainPage.css';
import './css/globals.css'
import rectangle77 from './img/rectangle-77.png';
import image1 from './img/image-1.png';
import image4 from './img/image-4.png';
import axios from 'axios';

const MainPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleSignupClick = () => {
    navigate('/signup');
  };
  const handleLoginClick=()=>{
    navigate('/login');
  };
  const handleUserlistClick=()=>{
    navigate('/userlist');
  };
  const handlePhotolistClick=()=>{
    navigate('/photolist');
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
      <div className="mainpage screen">
        <div className="header-nav">
          <div className="flex-row">
            <img className="rectangle-77" src={rectangle77} alt="Rectangle 77" />
            <div className="links">
              <div className="place" onClick={handleMainPageClick}>Home</div>
              <div className="x-list" onClick={handleUserlistClick}>User List</div>
              <div className="x-list" onClick={handlePhotolistClick}>Photo List</div>
            </div>
            <div className="login-sign-up">
              <article className="button">
                <div className="frame-276">
                  <div className="sign-up valign-text-middle" onClick={handleLoginClick}>Log in</div>
                </div>
              </article>
              <article className="button-1">
                <div className="frame-276-1">
                  <div className="sign-up-1 valign-text-middle" onClick={handleSignupClick}>Sign up</div>
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
                    Your own story that records with photos, &#39;Photo Diary&#39;<br />
                    Our daily lives go by quickly, and precious moments are often forgettable. We want to capture
                    personal photo diaries into the digital world.<br />
                    &#34;Photo Diary&#34; isn&#39;t just a photo repository. It&#39;s a space where you can express your
                    thoughts, emotions, and moments in pictures and texts, and communicate with other users.
                  </p>
                  <div className="primary-button">
                    <div className="get-started" onClick={handleSignupClick}>Get started</div>
                  </div>
                </div>
              </div>
            </div>
            <img className="image-1" src={image1} alt="image 1" />
          </div>
          <div className="card">
            <div className="frame-14560">
              <div className="frame-14565" onClick={handleUserlistClick}>
                <div className="x-list-1">User List</div>
                <p className="text_label">Click to view the list of users</p>
              </div>
            </div>
            <div className="frame-14561">
              <div className="frame-14565" onClick={handlePhotolistClick}>
                <div className="x-list-1">Photo List</div>
                <p className="text_label-1">Click to check the list of photos</p>
              </div>
            </div>
          </div>
        </div>
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
          <img className="image-4" src={image4} alt="image 4" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;