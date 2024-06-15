import React, { useState, useEffect } from 'react';
import './css/ShowMessage.css';
import './css/styleguide.css';
import './css/globals.css';
import rectangle77 from './img/rectangle-77.png';
import icons from './img/icons.svg';
import image4 from './img/image-4.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShowMessage = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/session', { withCredentials: true });
        if (response.status === 200 && response.data.message) {
          const message = response.data.message;
          if (message.startsWith('Hello ')) {
            setUsername(message.slice(6));
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error('Error fetching session', error);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_messages', {
          params: { username }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [username]);

  const handlePhotolistClick = () => {
    navigate('/photolist');
  };

  const handleUserlistClick = () => {
    navigate('/userlist');
  };

  const handleMainPageClick = () => {
    if (isLoggedIn) navigate('/loggedin');
    else navigate('/');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        alert('Logout successful');
        navigate('/loggedin');
      }
    } catch (error) {
      console.error('Logout error', error);
      alert('Logout error');
    }
  };

  const handleReplyClick = (sender) => {
    localStorage.setItem('receiver', sender);
    navigate('/sendmessage');
  };

  return (
    <div className="container-center-horizontal">
      <div className="ShowMessage screen">
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
                <div className="frame-276 frame">
                  <img className="icons" src={icons} alt="Icons" />
                </div>
              </article>
              <article className="button-1" onClick={handleLogout}>
                <div className="frame-276-1">
                  <div className="sign-up valign-text-middle">Log out</div>
                </div>
              </article>
            </div>
          </div>
          <div className="divider-1"></div>
        </div>
        <div className="view">
          <h1 className="title">Received Messages</h1>
          <div className="message-list-container">
            {messages.length === 0 ? (
              <p>No messages found.</p>
            ) : (
              messages.map((msg, index) => (
                <div className="message" key={index}>
                  <div>
                    <p><strong>From:</strong> {msg.sender}</p>
                    <p className="message-content">{msg.message}</p>
                  </div>
                  <button className="reply-button" onClick={() => handleReplyClick(msg.sender)}>Reply</button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="group-8">
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
            <img className="image-5" src={image4} alt="image 5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMessage;
