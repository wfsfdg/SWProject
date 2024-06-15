import React, { useState, useEffect } from 'react';
import './css/SendMessage.css';
import './css/styleguide.css';
import './css/globals.css';
import rectangle77 from './img/rectangle-77.png';
import icons from './img/icons.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SendMessage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const receiver = localStorage.getItem('receiver');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/session', { withCredentials: true });
        if (response.status === 200 && response.data.message) {
          const message = response.data.message;
          if (message.startsWith('Hello ')) {
            const user = message.replace('Hello ', '').trim();
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

  const handlePhotolistClick = () => {
    navigate('/photolist');
  };
  
  const handleShowMessageClick = () => {
    navigate('/showmessage');
  };
  

  const handleUserlistClick = () => {
    navigate('/userlist');
  };

  const handleMainPageClick = () => {
    if (isLoggedIn) navigate('/loggedin');
    else navigate('/loggedin');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        alert('Logout successful');
        navigate('/main');
      }
    } catch (error) {
      console.error('Logout error', error);
      alert('Logout error');
    }
  };

  const handleMessageSend = async () => {
    if (!message) {
      alert('메시지를 입력하세요');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/messages', {
        sender: username,
        receiver: receiver,
        message: message
      });
      if (response.status === 200) {
        alert('메시지가 성공적으로 전송되었습니다');
        setMessage('');
        navigate('/loggedin');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('메시지 전송 실패');
    }
  };

  return (
    <div className="container-center-horizontal">
      <div className="SendMessage screen">
        <div className="header-nav">
          <div className="flex-row">
            <img className="rectangle-77" src={rectangle77} alt="Rectangle 77" />
            <div className="links">
              <div className="place" onClick={handleMainPageClick}>Home</div>
              <div className="x-list" onClick={handleUserlistClick}>User List</div>
              <div className="x-list" onClick={handlePhotolistClick}>Photo List</div>
            </div>
          </div>
          <div className="button" onClick={handleLogout}>
            <div className="frame-276"><div className="sign-up valign-text-middle">Log out</div></div>
          </div>
          <div className="divider"></div>
        </div>
        <div className="background">
          <div className="view"><img className="icons" onClick={handleShowMessageClick} src={icons} alt="Icons" /></div>
          <div className="dm">
            <div className="overlap-group">
              <div className="frame-300">
                <input
                  type="text"
                  className="text-field"
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="button-container">
                  <div className="button-1" onClick={() => setMessage('')}><div className="delete valign-text-middle">Delete</div></div>
                  <div className="button-2" onClick={handleMessageSend}><div className="reply valign-text-middle">Send</div></div>
                </div>
              </div>
              <h1 className="text-1 valign-text-middle">{receiver}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
