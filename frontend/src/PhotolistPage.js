import React, { useState, useEffect } from 'react';
import './css/PhotolistPage.css';
import './css/styleguide.css';
import './css/globals.css';
import rectangle77 from './img/rectangle-77.png';
import icons from './img/icons.svg';
import image7 from './img/image-7.png';
import image4 from './img/image-4.png';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

const PhotolistPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const handleUserlistClick=()=>{
    navigate('/userlist');
  };
  const handleMainPageClick=()=>{
    if (isLoggedIn)
      navigate('/loggedin');
    else
    navigate('/');
  }
  const handlePhotoUploadClick=()=>{
    navigate('/photoupload')
  }

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
            <div className="PhotolistPage screen">
                <div className="header-nav">
                    <div className="flex-row flex">
                        <img className="rectangle-77" src={rectangle77} alt="Rectangle 77" />
                        <div className="links">
                            <div className="place" onClick={handleMainPageClick}>Home</div>
                            <div className="x-list" onClick={handleUserlistClick}>User List</div>
                            <div className="x-list" onClick={handlePhotolistClick}>Photo List</div>
                        </div>
                        <div className="login-sign-up">
                            <article className="button-1">
                                <div className="frame-276"><img className="icons" src={icons} alt="Icons" /></div>
                            </article>
                            <article className="button-2" onClick={handleLogout}>
                                <div className="frame-276-1"><div className="sign-up valign-text-middle">Log out</div></div>
                            </article>
                        </div>
                    </div>
                    <div className="divider-2"></div>
                </div>
                <div className="overlap-group1 overlap">
                    <div className="view">
                        <div className="flex-col flex">
                            <h1 className="title">Photo List</h1>
                            <div className="frame-14562">
                                <div className="enter-tag">Enter tag</div>
                                <img className="image-7" src={image7} alt="image 7" />
                            </div>
                        </div>
                        <div className="flex-row-1">
                            <div className="button-container">
                                <div className="button"><div className="pohto-1 valign-text-middle poppins-normal-black-16px">사진 첨부</div></div>
                                <div className="button"><div className="pohto valign-text-middle poppins-normal-black-16px">사진 첨부</div></div>
                                <div className="button"><div className="pohto valign-text-middle poppins-normal-black-16px">사진 첨부</div></div>
                            </div>
                            <div className="flex-col-1">
                                <div className="button-3" onClick={handlePhotoUploadClick}><div className="sign-up-1 valign-text-middle">Writing</div></div>
                                <div className="text-2 text-1 lato-semi-bold-mine-shaft-40px">제목</div>
                                <p className="text lato-normal-mine-shaft-22px">
                                    본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                                    본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                                    본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                                    (미리보기, 최대 글자수 정하기)
                                </p>
                                <div className="text-3 text-1 lato-semi-bold-mine-shaft-40px">제목</div>
                                <p className="text lato-normal-mine-shaft-22px">
                                    본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                                    본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                                    본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                                    (미리보기, 최대 글자수 정하기)
                                </p>
                                <div className="text-4 text-1 lato-semi-bold-mine-shaft-40px">제목</div>
                                <p className="text lato-normal-mine-shaft-22px">
                                    본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                                    본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                                    본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                                    (미리보기, 최대 글자수 정하기)
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="divider"></div>
                    <div className="divider-3"></div>
                    <div className="divider-4"></div>
                    <div className="divider-5"></div>
                </div>
                <div className="group-10">
                    <div className="overlap-group overlap">
                        <footer className="footer">
                            <div className="frame-275">
                                <div className="divider-1"></div>
                                <div className="frame-274">
                                    <div className="frame-269">
                                        <div className="frame-268">
                                            <div className="product valign-text-middle">Developer</div>
                                            <div className="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">
                                                Lee Seunghyun
                                            </div>
                                            <div className="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">2022112088</div>
                                            <div className="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">Choi Yoongi</div>
                                            <div className="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">2019112156</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="divider-1"></div>
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
        </div>
    );
}

export default PhotolistPage;
