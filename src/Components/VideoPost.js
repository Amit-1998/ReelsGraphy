import React from "react";
import ReactDOM from 'react-dom';

import './VideoPost.css';

const VideoPost = (props) => {
  const { src } = props;
  console.log("url of video", src);

  const handleClick = (e) => {
    console.log("e inside video", e);
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };

  const handledScroll = (e) => {
     let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
     if(next){
        next.scrollIntoView();
        e.target.muted = true;
     }
  }

  return (
    <video
      src={src}
      className="videos-styling"
      muted="muted"
      onEnded={handledScroll}
      onClick={handleClick}
      
    ></video>
  );
};

export default VideoPost;
