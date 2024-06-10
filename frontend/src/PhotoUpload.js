import React, { useState } from 'react';
import './css/PhotoUpload.css';

const PhotoUpload = () => {
    const [tag, setTag] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="container-center-horizontal">
            <div className="PhotoUpload screen">
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
                        <div className="select-attachment">Select attachment</div>
                    </div>
                </div>
                <div className="group-12">
                    <div className="sign-in-2 sign-in-3">
                        <textarea
                            className="enter-text lato-normal-mine-shaft-25px"
                            placeholder="Enter text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="25"  // 텍스트 영역의 높이를 조정합니다.
                        />
                    </div>
                </div>
                <div className="button">
                    <div className="sign-up valign-text-middle">Post</div>
                </div>
            </div>
        </div>
    );
};

export default PhotoUpload;
