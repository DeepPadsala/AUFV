import React, { useRef, useEffect, useState } from "react";
import emailjs from "emailjs-com";
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
  Card,
  Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`

const Update = () => {

  // const serviceID = process.env.REACT_APP_SERVICE_ID;
  // const templateID = process.env.REACT_APP_TEMPLATE_ID;
  // const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  const [email, setemail] = useState('');
  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('', '', form.current, '')
      .then((result) => {
        console.log(result.text);
        window.alert("Request sent successfully via email. It takes a week to process");
        // window.location.href = '/';
        navigate("/");

      }, (error) => {
        console.log(error.text);
      });
  };



  const callUpdate = async () => {
    try {
      const result = await fetch('/update', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        // credentials: 'include'
      });

      const data = await result.json();
      console.log(data);

      setemail(data.email);

      if (data.Error) {
        // window.location.href = '/login';
        navigate("/login");
      }

      if (result.status !== 200) {
        const error = new Error(result.error);
        throw error;
      }

    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  }

  useEffect(() => {
    callUpdate();
  }, []);

  const containerStyle = {
    // display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "2rem",
    backgroundImage: "linear-gradient(to bottom right, #a2deed, #87cefa)",
    fontFamily: "Montserrat, sans-serif",
  };

  return (
    <>
    <Navbar />
<div style={containerStyle}>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
        <form ref={form} method='GET' type="submit" onSubmit={sendEmail} >
          <Card sx={{  boxShadow: 24 }}>
            <Container>
              <Typography variant="h4">Request For Update Address In Gujarat</Typography>
              <FormControl>
                <lable>Your Email :</lable>
                <input name="email" className='mt-2' value={email} />
              </FormControl>
              <FormControl>
                <label>New Address :</label>
                <textarea name="address" required rows={4} />
              </FormControl>
              <FormControl>
                <Button variant='contained' className='mt-4'  type="submit" onSubmit={sendEmail}>Submit</Button>
              </FormControl>
              <div className="mt-5">

              </div>

            </Container>
          </Card>
        </form>

      </Grid>

    </Grid>
</div>
</>

    // <form ref={form} onSubmit={sendEmail}>
    //   <label>Address</label>
    //   <textarea name="address" />
    //   <input type="submit" value="Send" />
    // </form>
  );
};

export default Update