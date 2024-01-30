import React, { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";
import MovieIcon from "@material-ui/icons/Movie";
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import { database, storage } from "../firebase";

const UploadFile = (props) => {
    const { user } = props;
    console.log('user in UploadFile', user);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const inputChange = async (file) => {
        if (file == null) {
            setError('Please select a file first');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if (file.size / (1024 * 1024) > 100) { // if file is bigger than 100Mbs
            setError('This file is bigger than 1Mb')
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        
        let uid = uuidv4();
        setLoading(true);
        let uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file)
        uploadTask.on('state-changed', null, null, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                let postObj = {
                    likes: [],
                    comments: [],
                    postId: uid,
                    postUrl: url,
                    userName: user.fullname,
                    profileImage: user.profileUrl,
                    userId: user.userId,
                    createdAt: database.getTimeStamp()
                }
                database.posts.add(postObj).then(async(ref) => {
                    let res = await database.users.doc(user.userId).update({
                        postIds: user.postIds!=null ? [...user.postIds, ref.id] : [ref.id]
                    })
                }).then(() => {
                    setLoading(false);
                }).catch((err) => {
                    setError(err.message);
                    setTimeout(()=>{
                        setError("");
                    },2000)
                    setLoading(false);
                });
            })
        })
        // setLoading(false);

    }

    return (
        <div style={{marginTop: '5rem', marginBottom: '1rem'}}>
            {
                error != '' ? <Alert severity="error">{error}</Alert> :
                    <>
                        <input type="file" accept='video/*' id="upload-input" onChange={(e) => { inputChange(e.target.files[0]) }} style={{ display: 'none' }} />
                        <label htmlFor="upload-input">
                            <Button
                                variant="outlined"
                                color='secondary'
                                disabled={loading}
                                component="span"
                            >
                                <MovieIcon />
                                &nbsp;Upload Video
                            </Button>
                        </label>
                        {loading && <LinearProgress color='secondary' style={{ marginTop: '4%' }} />}
                    </>
            }
        </div>
    );
}

export default UploadFile;