import * as React from "react";
import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Button,
  CardActionArea,
  CardActions,
  TextField,
} from "@mui/material";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import insta2 from "../Assets/insta.jpg";
import mobile from "../Assets/mobile.jpg";
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import img3 from "../Assets/img3.jpg";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "pure-react-carousel/dist/react-carousel.es.css";
import { auth } from "../firebase.js";
import "./Login.css";

export default function ForgetPassword() {
  const store = useContext(AuthContext);
  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    text2: {
      textAlign: "center",
    },
    card2: {
      height: "6vh",
      marginTop: "2%",
    },
  });
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { forgot } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      setError("");
      setLoading(true);
      await forgot(email);
      toast.success("Password Reset Email Sent Successfully !");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error(`${err.message}`);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  };

  // const sendPasswordResetEmail = async (email) => {
  //     try {
  //       const res = await sendPasswordResetEmail(auth, email);
  //       console.log('res of reset', res);
  //     } catch (error) {
  //       console.error('Error sending password reset email:', error);
  //       // Handle the error appropriately
  //     }
  //   };

  return (
    <>
      <div className="loginWrapper">
        <div
          className="imgcar"
          style={{
            backgroundImage: "url(" + mobile + ")",
            backgroundSize: "cover",
          }}
        >
          <div className="car">
            <CarouselProvider
              naturalSlideWidth={238}
              naturalSlideHeight={423}
              totalSlides={3}
              visibleSlides={1}
              hasMasterSpinner
              isPlaying={true}
              infinite={true}
              dragEnabled={false}
              touchEnabled={false}
            >
              <Slider>
                <Slide index={0}>
                  <Image src={img1} />
                </Slide>
                <Slide index={1}>
                  <Image src={img2} />
                </Slide>
                <Slide index={2}>
                  <Image src={img3} />
                </Slide>
              </Slider>
            </CarouselProvider>
          </div>
        </div>
        <div className="loginCard">
          <Card variant="outlined">
            <div className="insta-logo">
              <img src={insta2} alt="" />
            </div>
            <CardContent>
              {error != "" && <Alert severity="error">{error}</Alert>}

              <Typography
                className={classes.text2}
                color="primary"
                variant="subtitle1"
              >
                Password Recovery
              </Typography>
              <TextField
                id="outlined-basic"
                label="Enter Email"
                variant="outlined"
                fullWidth={true}
                margin="dense"
                size="small"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                fullWidth={true}
                variant="contained"
                onClick={handleClick}
                disabled={loading}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
          {/* <Card variant='outlined' className={classes.card2}>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Don't have an account ? <Link to='/signup' style={{ textDecoration: 'none' }}>Sign up</Link>
                        </Typography>
                    </CardContent>
                </Card> */}
        </div>
      </div>
      <ToastContainer position="top-center"/>
    </>
  );
}
