import React, { useState, useEffect } from 'react';
import './css/UserlistPage.css';
import './css/styleguide.css';
import './css/globals.css';
import rectangle77 from './img/rectangle-77.png';
import icons from './img/icons.svg';
import image6 from './img/image-6.png';
import image4 from './img/image-4.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserListPage = () => {
  const navigate = useNavigate();
  const [usernames, setUsernames] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginClick=()=>{
    navigate('/login');
  };
  const handleSignupClick = () => {
    navigate('/signup');
  };

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
    const fetchUsernames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usernames');
        setUsernames(response.data);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUsernames();
  }, []);

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

  const handleUserClick = (name) => {
    if (isLoggedIn){
    localStorage.setItem('selectedUsername', name);
    navigate('/sendmessage');}
    else{
        alert('you need to get logged in first')
    }
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
if (isLoggedIn)
  return (
    <div className="container-center-horizontal">
      <div className="UserlistPage screen">
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
          <h1 className="title">User List</h1>
          <div className="user-list-container">
            {usernames.map((name, index) => (
              <div className="user" key={index} onClick={()=>handleUserClick(name)}>
                <img className="image-6" src={image6} alt="User Avatar" />
                <div className="text lato-semi-bold-mine-shaft-22px">{name}</div>
              </div>
            ))}
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

return (
    <div className="container-center-horizontal">
      <div className="UserlistPage screen">
      <div className="header-nav2">
            <div className="flex-row2">
              <img className="rectangle-772" src={rectangle77} alt="Rectangle 772" />
              <div className="links2">
                <div className="place2" onClick={handleMainPageClick}>Home</div>
                <div className="x-list2" onClick={handleUserlistClick}>User List</div>
                <div className="x-list2" onClick={handlePhotolistClick}>Photo List</div>
              </div>
              <div className="login-sign-up2">
                <article className="button21">
                  <div className="frame-2762">
                    <img className="icons2" src={icons} alt="Icons2" />
                  </div>
                </article>
                <article className="button-12 button-32">
                  <div className="frame-276-12 frame-276-32">
                    <div className="sign-up2 valign-text-middle" onClick={handleLoginClick}>Log in</div>
                  </div>
                </article>
                <article className="button-22 button-32">
                  <div className="frame-276-22 frame-276-32">
                    <div className="sign-up-12 valign-text-middle" onClick={handleSignupClick}>Sign up</div>
                  </div>
                </article>
              </div>
            </div>
            <div className="divider22"></div>
          </div>
        <div className="view">
          <h1 className="title">User List</h1>
          <div className="user-list-container">
            {usernames.map((name, index) => (
              <div className="user" key={index} onClick={()=>handleUserClick(name)}>
                <img className="image-6" src={image6} alt="User Avatar" />
                <div className="text lato-semi-bold-mine-shaft-22px">{name}</div>
              </div>
            ))}
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

export default UserListPage;
