import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import logo from './image/logo.png'
import photodiary from './image/PhotoDiary.png'
import { Link } from 'react-router-dom';
import mainimg from './image/main_image.png';

const MainPage = () => {
  const navigate = useNavigate();
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
  return (
    <div className="main-container">
      <div className="header-nav">
        <div className="LogoAndMenu">
        <img className="rectangle77" src={logo} alt="Logo" />
        <div className="links">
          <Link to="/" className="home UpHome">Home</Link>
          <Link to="/userlist" className="user-list">User list</Link>
          <Link to="/photolist" className="photo-list">Photo list</Link>
        </div>
        </div>
        <div className="login-signup">
          <div className="button login" onClick={handleLoginClick}>
            <div className="button-text">Log in</div>
          </div>
          <div className="button signup" onClick={handleSignupClick}>
            <div className="button-text">Sign in</div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div classname="frame1">
          <div className="content">
            <div className="frame45">
              <div className="take-a-picture">Take a picture</div>
              <div className="keep-a-diary">Keep a diary</div>
            </div>
            <div className="frame14559">
             <div className="rectangle76" />
              <div className="frame14568">
                <div className="photo-diary-description">
                Your own story that records with photos, 'Photo Diary' Our daily lives go by quickly, and precious moments are often forgettable. We want to capture personal photo diaries into the digital world. "Photo Diary" isn't just a photo repository. It's a space where you can express your thoughts, emotions, and moments in pictures and texts, and communicate with other users.
                </div>
                <div className="primary-button" onClick={handleSignupClick}>
                  <div className="get-started">Get started</div>
              </div>
            </div>
            <img className="image1" src={mainimg} alt="Main Visual" />
          </div>
          </div>
        </div>
        
        <div className="card-container">
          <div className="card1" onclick={handleUserlistClick}>
            <div className="frame14560" >
              <div className="frame14565">
                <div className="user-list-title">User list</div>
                <div className="user-list-description">Click to check the list of users</div>
              </div>
            </div>
          </div>
          <div className="card2">
            <div className="frame14561" onclick={handlePhotolistClick}>
              <div className="frame14565" >
                <div className="photo-list-title">Photo list</div>
                <div className="photo-list-description">Click to check the list of photos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="frame275">
        <hr class="default"></hr>
          <div className="frame274">
            <div className="frame269">
            <img className="image4" src={photodiary} alt="Footer Image" />
              <div className="frame268">
                <div className="product">개발자</div>
                <div className="pricing">이승현</div>
                <div className="solutions">2022112088</div>
                <div className="education">최윤기</div>
                <div className="team-plans">2019112156</div>
              </div>
              
            </div>
          </div>
          <hr class="default"></hr>
          <div className="group6">
            <div className="frame272">
         
            </div>
            <div className="frame271" />
          </div>
        </div>
      </div>
      <div className="copyright2022">@소프트웨어 공학 2024</div>
    </div>
  );
};

export default MainPage;