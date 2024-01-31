import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import VideoPost from "./VideoPost";
import LikedBy from "./LikedBy";
import AddComment from "./AddComment";
import './Posts.css';
import AllComments from "./AllComments";

const DialogueComp = (props) => {
  const { open, onClose, video, post, userData } = props;

  const handleClose = () => {
    onClose(null);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slotProps={{
        backdrop: { sx: { background: "rgba(255, 255, 255, 0.25)" } },
      }}
      fullWidth={true}
      maxWidth={"md"}
      video={video}
    >
      <div className="modal-container">
        <div className="modal-video-container">
          <video autoPlay={true} muted="muted" controls>
            <source src={video} />
          </video>
        </div>
        <div className="comment-container">
          <Card className="card1" style={{padding: '1rem'}}>
            <AllComments postData={post}/>
          </Card>

          <Card variant="outlined" className="card2">
             <Typography style={{padding: '0.4rem'}}>{post.likes?.length==0 ? '': `Liked by ${post.likes?.length} users`}</Typography>
             <div style={{display: 'flex'}}>
                 <LikedBy userData={userData} postData={post} style={{display:'flex', alignItems: 'center', justifyContent:  'center'}} />
                 <AddComment userInfo={userData} postData={post} />
             </div>
          </Card>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogueComp;
