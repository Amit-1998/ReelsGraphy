import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Alert, Button, CardActionArea, CardActions, TextField } from '@mui/material';
import insta2 from '../Assets/insta.jpg';
import { makeStyles } from '@mui/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';
import './SignUp.css';

export default function SignUp() {
  const useStyles = makeStyles({
    text1: {
      color: 'grey',
      textAlign: 'center'
    },
    card2: {
      height: '6vh',
      marginTop: '2%',
    }
  })
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleClick = async () => {
    if (file == null) {
      setError('Please upload profile image first!!');
      setTimeout(() => {
        setError('');
      }, 2000)
      return;
    }
    try {
      setError('');
      setLoading(true);
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      console.log('user id', uid);
      
      let uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file)
      uploadTask.on('state-changed',null,null,() => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log('url => ',url);
          database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullname: name,
            profileUrl: url,
            createdAt: database.getTimeStamp()
          })
        })
      })
      setLoading(false);
      navigate('/');

    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError('');
      }, 2000)
    }
  }

  return (
    <div className="signUpWrapper">
      <div className="signUpCard">
        <Card variant="outlined" >
          <div className="insta-logo">
            <img src={insta2} alt="" />
          </div>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1" component="div">
              Sign up to see photos and videos from your friends
            </Typography>
            {error!='' && <Alert severity="error">{error}</Alert>}
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size='small' value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size='small' value={name} onChange={(e) => setName(e.target.value)} />
            <Button color="secondary" variant="outlined" fullWidth={true} margin="dense" startIcon={<CloudUploadIcon />} component='label'>
              UPLOAD PROFILE IMAGE
              <input type="file" accept='images/*' hidden onChange={(e) => setFile(e.target.files[0])} />
            </Button>
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions>
            <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
              SignUp
            </Button>
          </CardActions>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1" component="div">
              By signing up, you agree to our Terms, Conditions and Cookies policy.
            </Typography>
          </CardContent>
        </Card>
        <Card variant='outlined' className={classes.card2}>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Having an account ? <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
