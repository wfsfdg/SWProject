import React, { useState, useEffect } from 'react';
import './css/PhotoUpload.css';
import './css/styleguide.css';
import './css/globals.css';
import rectangle77 from './img/rectangle-77.png';
import icons from './img/icons.svg';
import image4 from './img/image-4.png';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

const PhotoEdit = () => {
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [attachment, setAttachment] = useState([]);
  const navigate = useNavigate();
  
  const postId = localStorage.getItem('postId');

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${postId}`);
        const post = response.data;
        setTitle(post.title);
        setTag(post.tag);
        setDescription(post.description);
        setAttachment(post.files);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleFileChange = (e) => {
    setAttachment(Array.from(e.target.files));
  };

  const handlePhotolistClick = () => {
    navigate('/photolist');
  };

  const handleUserlistClick = () => {
    navigate('/userlist');
  };

  const handleMainPageClick = () => {
    if (isLoggedIn)
      navigate('/loggedin');
    else
      navigate('/');
  };

  const handlePhotoUploadClick = () => {
    navigate('/photoupload')
  };

  const handleSubmit = async () => {
    if (!title || !tag || !description) {
      alert('There are fields that have not been entered');
      return;
    }
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('title', title);
    formData.append('tag', tag);
    formData.append('description', description);
    Array.from(attachment).forEach(file => {
      formData.append('files', file);
    });
  
    try {
      const response = await axios.put(`http://localhost:5000/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server Response:', response.data);
      alert('Edit successful!');
      navigate('/photoview');
    } catch (error) {
      console.error('Error editing post:', error);
      alert('Edit failed. Please try again.');
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
    <div className="container-center-horizontal">
      <div className="PhotoUpload screen">
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
                <div className="frame-276 frame"><img className="icons" src={icons} alt="Icons" /></div>
              </article>
              <article className="button-1 button-3">
                <div className="frame-276-1"><div className="sign-up valign-text-middle">Log out</div></div>
              </article>
            </div>
          </div>
          <div className="divider-1"></div>
        </div>
        <div className="view">
          <div className="sign-in-1 sign-in-3">
            <input
              type="text"
              className="h1-enter-title"
              placeholder="h1태그 Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="sign-in-container sign-in-3 lato-normal-mine-shaft-25px">
            <div className="sign-in">
              <input
                type="text"
                className="enter-tag-tag"
                placeholder="Enter tag (#tag)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <div className="sign-in">
              <div className="select-attachment">
                Select attachment
                <input
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div className="sign-in-2 sign-in-3">
            <textarea
              className="enter-text lato-normal-mine-shaft-25px"
              placeholder="Enter text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="50"  // 텍스트 영역의 높이를 조정합니다.
            />
          </div>
          <div className="button-2" onClick={handleSubmit}><div className="sign-up-1 valign-text-middle">Save</div></div>
        </div>
        <div className="group-11">
          <div className="overlap-group">
            <footer className="footer">
              <div className="frame-275 frame">
                <div className="divider"></div>
                <div className="frame-274 frame">
                  <div className="frame-269 frame">
                    <div className="frame-268 frame">
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
                <div className="divider"></div>
                <div className="group-6">
                  <div className="frame-272 frame">
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
};

export default PhotoEdit;
