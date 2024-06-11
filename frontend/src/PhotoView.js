import React, { useState, useEffect } from 'react';
import './css/PhotoView.css';
import './css/styleguide.css';
import './css/globals.css';
import rectangle77 from './img/rectangle-77.png';
import icons from './img/icons.svg';
import image4 from './img/image-4.png';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PhotoView = () => {
  const navigate = useNavigate();
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handlePostClick = (event) =>{

  }
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
            setIsLoggedIn(true);
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
  const handleUserlistClick=()=>{
    navigate('/userlist');
  };
  const handleMainPageClick=()=>{
    if (isLoggedIn)
      navigate('/loggedin');
    else
    navigate('/');
  }
      
  const handlePhotoViewClick=()=>{
    navigate('/photoView');
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
      <div className="PhotoView screen">
        <div className="header-nav">
          <div className="flex-row">
            <img className="rectangle-77" src={rectangle77} alt="Rectangle 77" />
            <div className="links">
              <div className="place"onClick={handleMainPageClick}>Home</div>
              <div className="x-list"onClick={handleUserlistClick}>User List</div>
              <div className="x-list"onClick={handlePhotolistClick}>Photo List</div>
            </div>
            <div className="login-sign-up">
              <article className="button">
                <div className="frame-276"><img className="icons" src={icons} alt="Icons" /></div>
              </article>
              <article className="button-1 button-5 " onClick={handleLogout}>
                <div className="frame-276-1"><div className="sign-up valign-text-middle">Log out</div></div>
              </article>
            </div>
          </div>
          <div className="divider-1"></div>
        </div>
        <div className="view">
          <h1 className="h1">h1태그 제목</h1>
          <div className="overlap-group">
            <div className="text-2 text">글쓴이</div>
            <div className="button-2 button-5"><div className="sign-up-1 valign-text-middle">Send DM</div></div>
            <div className="button-3 button-5"><div className="text-3 valign-text-middle">태그</div></div>
          </div>
          <div className="button-4 button-5"><div className="pohto valign-text-middle">사진 첨부</div></div>
          <p className="text-1 text">
            본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
            본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
            본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
          </p>
        </div>
        <div className="group-9">
          <div className="overlap-group1">
            <footer className="footer">
              <div className="frame-275 frame">
                <div className="divider"></div>
                <div className="frame-274 frame">
                  <div className="frame-269 frame">
                    <div className="frame-268 frame">
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
                  <div className="frame-272 frame">
                    <div className="copyright-2022 valign-text-middle">@software engineering 2024</div>
                  </div>
                </div>
              </div>
            </footer>
            <img className="image-5" src={image4} alt="image 5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoView;
