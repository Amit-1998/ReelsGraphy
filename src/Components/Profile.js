import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { CircularProgress } from "@material-ui/core";
import Navbar from "./Navbar";
import { Avatar, Typography } from "@mui/material";
import './Profile.css';
import VideoPost from "./VideoPost";
import Like from "./Like";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import DialogueComp from "./DialogueComp";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(false);

  const openModal = (id) => {
    setOpen(id);
  }
  
  const closeModal = () => {
     setOpen(null);
  }

  useEffect(() => {
    database.users.doc(id).onSnapshot((snap) => {
      setUserData(snap.data());
    });
  }, [id]);

  useEffect(() => {
    const asyncFunc = async () => {
      if (userData != null) {
        let parr = [];
        for (let i = 0; i < userData.postIds.length; i++) {
          let postData = await database.posts.doc(userData.postIds[i]).get();
          parr.push({...postData.data(), postId: postData.id});
        }
        setPosts(parr);
      }
    };
    asyncFunc();
  });

  return (
    <>
      {posts == null || userData == null ? (
        <CircularProgress />
      ) :
      <> 
        <Navbar userData={userData} />
        <div className="spacer"></div>
        <div className="container">
          <div className="upper-part">
            <div className="profile-img">
              <img src={userData.profileUrl} />
            </div>
            <div className="info">
              <Typography variant="h6">
                No of Posts: {userData.postIds.length}
              </Typography>
              <Typography variant="h6">
                Email: {userData.email}
              </Typography>
            </div>
          </div>
          <hr style={{marginTop: '1rem', marginBottom: '1rem'}} />
          <div className="profile-video-container">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              <div className="videos">
                <video muted="muted" onClick={() => openModal(post.postId)}>
                    <source src={post.postUrl} />
                </video>
                <Like userData={userData} postData={post} />
                <MessageOutlinedIcon className="chat-styling"  />
                <DialogueComp open={open === post.postId} onClose={closeModal} video={post.postUrl} post={post} userData={userData} />
              </div>
            </React.Fragment>
          ))}
        </div>
        </div>
      </>}
    </>
  );
};

export default Profile;
