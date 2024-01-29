import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { database } from '../firebase';

const AddComment = ({ userInfo, postData }) => {
  const [text, setText] = useState('');

  const addComment = () => {
    let obj = {
      text: text,
      uProfileImage: userInfo.profileUrl,
      uName: userInfo.fullname
    }
    database.comments.add(obj).then((doc) => {
      console.log('doc', doc);
      database.posts.doc(postData.postId).update({
        comments: [...postData.comments, doc.id]
      })
    })
    setText('');
  }

  return (
    <div style={{width: '100%', display:'flex', alignItems: 'center', justifyContent:  'center'}}>
        <TextField id="outlined-basic" label="Comment" variant="outlined" size={'small'} sx={{width: '70%'}} value={text} onChange={(e) => setText(e.target.value)} />
        <Button variant='contained' onClick={addComment}>Post</Button>
    </div>
  )
}

export default AddComment