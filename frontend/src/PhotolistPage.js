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
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  // useEffect 훅 수정
  useEffect(() => {
    fetchPosts(page);
  }, [page, searchTerm]);

  // fetchPosts 함수 수정
  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/posts', {
        params: { limit: 10, offset: (page - 1) * 10, tag: searchTerm }
      });
      if (response.data.length > 0) {
        setPosts(prevPosts => {
          const newPosts = response.data.filter(post => !prevPosts.some(p => p._id === post._id));
          return [...prevPosts, ...newPosts];
        });
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const handlePhotolistClick = () => {
    navigate('/photolist');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // 페이지를 1로 리셋
    setPosts([]); // 포스트를 초기화
    setHasMore(true); // hasMore를 true로 설정
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
  }

  const handleUserClick = (name) => {
    localStorage.setItem('selectedUsername', name);
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
  const handlePostClick = (postId) => {
    localStorage.setItem('postId', postId);
    navigate('/photoview');
  };

  if (!isLoggedIn)
    return (
      <div className="container-center-horizontal">
        <div className="PhotolistPage2 screen">
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
          <div className="view2">
            <h1 className="title2">You can use it after logging in.</h1>
          </div>
        </div>
      </div>
    );
  
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
                <input
                  type="text"
                  className="enter-tag"
                  placeholder="Enter tag"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <img className="image-7" src={image7} alt="image 7" />
              </div>
            </div>
            <div className="button-3" onClick={handlePhotoUploadClick}>
              <div className="sign-up-1 valign-text-middle">Writing</div>
            </div>
            <div className="flex-col-1">
              {posts.map(post => (
                <div key={post._id} className="post-item" onClick={() => handlePostClick(post._id)}>
                  <img src={`http://localhost:5000/uploads/${post.files[0]}`} alt="Post" className="fixed-size-image" />
                  <div className="post-content">
                    <div>
                      <h2 className="post-title">{post.title}</h2>
                      <div className="post-tag">{post.tag}</div>
                    </div>
                    <p className="post-description">{post.description}</p>
                  </div>
                </div>
              ))}
              {loading && <p>Loading...</p>}
            </div>
          </div>
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
};

export default PhotolistPage;
