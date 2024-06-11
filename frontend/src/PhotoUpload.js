import React, { useState, useEffect } from 'react';
import './css/PhotoUpload.css';
import './css/styleguide.css';
import './css/globals.css';
import rectangle77 from './img/rectangle-77.png';
import icons from './img/icons.svg';
import image4 from './img/image-4.png';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';


const PhotoUpload = () => {
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [attachment,setAttachment] =useState([]);
  const navigate = useNavigate();
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
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('title', title);
    formData.append('tag', tag);
    formData.append('description', description);
    attachment.forEach(file => {
      formData.append('files', file);
    });
  
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server Response:', response.data);
      alert('Upload successful!');
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload failed. Please try again.');
    }
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
      <div class="container-center-horizontal">
      <div class="PhotoUpload screen">
        <div class="header-nav">
          <div class="flex-row">
            <img class="rectangle-77" src={rectangle77} alt="Rectangle 77" />
            <div class="links">
              <div class="place" onClick={handleMainPageClick}>Home</div>
              <div class="x-list" onClick={handleUserlistClick}>User List</div>
              <div class="x-list" onClick={handlePhotolistClick}>Photo List</div>
            </div>
            <div class="login-sign-up">
              <article class="button">
                <div class="frame-276 frame"><img class="icons" src={icons} alt="Icons" /></div>
              </article>
              <article class="button-1 button-3">
                <div class="frame-276-1"><div class="sign-up valign-text-middle">Log out</div></div>
              </article>
            </div>
          </div>
          <div class="divider-1"></div>
        </div>
        <div class="view">
          <div class="sign-in-1 sign-in-3">
            <input
            type="text"
            className="h1-enter-title"
            placeholder="h1태그 Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div class="sign-in-container sign-in-3 lato-normal-mine-shaft-25px">
            <div class="sign-in">
            <input
            type="text"
            className="enter-tag-tag"
            placeholder="Enter tag (#tag)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            />

            </div>
            <div class="sign-in">
              <div class="select-attachment">Select attachment
              <input
                  type="file"
                  onChange={(e) => ([...attachment, ...Array.from(e.target.files)])}
                /></div>
            </div>
          </div>
          <div class="sign-in-2 sign-in-3">
          <textarea
                            className="enter-text lato-normal-mine-shaft-25px"
                            placeholder="Enter text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="50"  // 텍스트 영역의 높이를 조정합니다.
              />
            </div>
          <div class="button-2 button-3" onClick={handleSubmit}><div class="sign-up-1 valign-text-middle">Post</div></div>
        </div>
        <div class="group-11">
          <div class="overlap-group">
            <footer class="footer">
              <div class="frame-275 frame">
                <div class="divider"></div>
                <div class="frame-274 frame">
                  <div class="frame-269 frame">
                    <div class="frame-268 frame">
                      <div class="product valign-text-middle">Developer</div>
                      <div class="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">
                        Lee Seunghyun
                      </div>
                      <div class="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">2022112088</div>
                      <div class="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">Choi Yoongi</div>
                      <div class="frame-268-item valign-text-middle poppins-normal-granite-gray-14px">2019112156</div>
                    </div>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="group-6">
                  <div class="frame-272 frame">
                    <div class="copyright-2022 valign-text-middle">@software engineering 2024</div>
                  </div>
                </div>
              </div>
            </footer>
            <img class="image-4" src={image4} alt="image 4" />
          </div>
        </div>
      </div>
    </div>
    );
};

export default PhotoUpload;
