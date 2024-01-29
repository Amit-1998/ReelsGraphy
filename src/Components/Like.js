import React, { useEffect, useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { database } from "../firebase";
import './Posts.css';

const Like = ({ userData, postData }) => {
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
            <ThumbUpIcon className={"icon-styling like"} onClick={handleLike} />
           : 
            <ThumbUpIcon className={'icon-styling unlike'} onClick={handleLike} />
          }
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Like;
