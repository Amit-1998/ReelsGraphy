import React, { useEffect, useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { database } from "../firebase";
import './Posts.css';

const LikedBy = ({ userData, postData }) => {
  const [like, setLike] = useState(null);

  useEffect(() => {
    let check = postData.likes.includes(userData.userId) ? true : false;
    setLike(check);
  }, [postData]);

  const handleLike = (e) => {
    try{
      e.preventDefault();
      console.log('like btn clicked', e);
       if(like === true){
         let narr = postData.likes.filter((el) => el!==userData.userId);
         database.posts.doc(postData.postId).update({
          likes: narr
         })
       }else{
          let narr = [...postData.likes, userData.userId];
          database.posts.doc(postData.postId).update({
            likes:  narr
          })
       }
    }catch(error){
       console.log('error in handleLike', error);
    }
  }

  return (
    <div>
      {like != null ? (
        <>
          {like === true ? 
            <ThumbUpAltOutlinedIcon style={{padding: '1rem', paddingTop: '0.5rem'}} className={"like"} onClick={handleLike} />
           : 
            <ThumbUpAltOutlinedIcon style={{padding: '1rem', paddingTop: '0.5rem'}} className={'unliked'} onClick={handleLike} />
          }
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LikedBy;
