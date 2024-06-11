import React from 'react';
import './css/PhotoUpload.css';
import './css/styleguide.css';
import './css/globals.css';
import rectangle77 from './img/rectangle-77.png';
import icons from './img/icons.svg';
import image4 from './img/image-4.png';

const PhotoUpload = () => {
    return (
        <div className="container-center-horizontal">
            <div className="PhotoUpload screen">
                <div className="header-nav">
                    <div className="flex-row">
                        <img className="rectangle-77" src={rectangle77} alt="Rectangle 77" />
                        <div className="links">
                            <div className="place">Home</div>
                            <div className="x-list">User List</div>
                            <div className="x-list">Photo List</div>
                        </div>
                        <div className="login-sign-up">
                            <article className="button">
                                <div className="frame-276"><img className="icons" src={icons} alt="Icons" /></div>
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
                        <h1 className="h1-enter-title">h1태그 Enter title</h1>
                        <p className="text-3 lato-normal-mine-shaft-25px">
                            본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                        </p>
                    </div>
                    <div className="sign-in-container sign-in-3 lato-normal-mine-shaft-25px">
                        <div className="sign-in">
                            <div className="enter-tag-tag">Enter tag (#tag)</div>
                            <p className="text">
                                본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
                            </p>
                        </div>
                        <div className="sign-in">
                            <div className="select-attachment">Select attachment</div>
                        </div>
                    </div>
                    <div className="sign-in-2 sign-in-3"><div className="enter-text lato-normal-mine-shaft-25px">Enter text</div></div>
                    <div className="button-2 button-3"><div className="sign-up-1 valign-text-middle">Post</div></div>
                </div>
                <div className="group-11">
                    <div className="overlap-group">
                        <footer className="footer">
                            <div className="frame-275">
                                <div className="divider"></div>
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
                                <div className="divider"></div>
                                <div className="group-6">
                                    <div className="frame-272">
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

export default PhotoUpload;
