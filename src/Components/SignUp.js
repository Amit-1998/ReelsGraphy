import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Alert, Button, CardActionArea, CardActions, TextField } from '@mui/material';
import insta2 from '../Assets/insta.png';
import { makeStyles } from '@mui/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Link} from 'react-router-dom'; 
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
            {true && <Alert severity="error">
              This is an error alert -- check it out!
            </Alert>}
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' />
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size='small' />
            <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size='small' />
            <Button color="secondary" variant="outlined" fullWidth={true} margin="dense" startIcon={<CloudUploadIcon />} component='label'>
              UPLOAD PROFILE IMAGE
              <input type="file" accept='images/*' hidden />
            </Button>
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions>
            <Button color="primary" fullWidth={true} variant="contained">
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
