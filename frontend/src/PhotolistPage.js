import React from 'react';
import './css/PhotolistPage.css'; // PhotolistPage.css 파일을 import합니다.
import image7 from './img/image-7.png';

const PhotolistPage = () => {
  return (
    <div className="container-center-horizontal">
      <div className="PhotolistPage screen">
        <div className="flex-col">
          <h1 className="title">Photo List</h1>
          <div className="frame-14562">
            <div className="enter-tag">Enter tag</div>
            <img className="image-7" src={image7} alt="image 7" />
          </div>
        </div>
        <div className="flex-row">
          <div className="button-container button-2">
            <div className="button"><div className="pohto-1 valign-text-middle poppins-normal-black-16px">사진 첨부</div></div>
            <div className="button"><div className="pohto valign-text-middle poppins-normal-black-16px">사진 첨부</div></div>
            <div className="button"><div className="pohto valign-text-middle poppins-normal-black-16px">사진 첨부</div></div>
          </div>
          <div className="flex-col-1">
            <div className="button-1 button-2"><div className="sign-up valign-text-middle">Writing</div></div>
            <div className="text-2 text-1 lato-semi-bold-mine-shaft-40px">제목</div>
            <p className="text lato-normal-mine-shaft-22px">
              본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
              본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
              본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 (미리보기, 최대
              글자수 정하기)
            </p>
            <div className="text-3 text-1 lato-semi-bold-mine-shaft-40px">제목</div>
            <p className="text lato-normal-mine-shaft-22px">
              본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
              본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
              본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 (미리보기, 최대
              글자수 정하기)
            </p>
            <div className="text-4 text-1 lato-semi-bold-mine-shaft-40px">제목</div>
            <p className="text lato-normal-mine-shaft-22px">
              본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
              본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문
              본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 (미리보기, 최대
              글자수 정하기)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotolistPage;
