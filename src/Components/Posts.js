import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { CircularProgress } from "@mui/material";
import VideoPost from "./VideoPost";
import Avatar from "@mui/material/Avatar";
import DialogueComp from "./DialogueComp";
import Like from "./Like";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import "./Posts.css";

const Posts = ({ userData }) => {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const openModal = (id) => {
    setOpen(id);
  }
  
  const closeModal = () => {
     setOpen(null);
  }

  useEffect(() => {
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        let parr = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });
        setPosts(parr);
      });
    console.log("posts in feeds", posts);

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              <div className="videos">
                <VideoPost src={post.postUrl} />
                <div className="fa" style={{display: 'flex'}}>
                  <Avatar src={userData.profileUrl} />
                  <h4>{userData.fullname}</h4>
                </div>
                <Like userData={userData} postData={post} />
                <MessageOutlinedIcon className="chat-styling" onClick={() => openModal(post.postId)} />
                <DialogueComp open={open === post.postId} onClose={closeModal} video={post.postUrl} post={post} userData={userData} />
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
