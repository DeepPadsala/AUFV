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
import { toast } from 'react-toastify';

import Navbar from "./Navbar";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`


const Img = () => {
    const form = useRef();
    const [img, setImg] = useState('');
    const [email, setEmail] = useState('');
    const [newImg, setNewImg] = useState('');

    const navigate = useNavigate();

    // let name, value;

    // const handleEmail = (e) => {
    //     // console.log(e);
    //     name = e.target.name;
    //     value = e.target.value;
    //     setEmail(value);
    //     // setUser({ ...user, [name]: value });
    // }
    // const handleAddress = (e) => {
    //     // console.log(e);
    //     name = e.target.name;
    //     value = e.target.value;
    //     setAddress(value);
    //     // setUser({ ...user, [name]: value });
    // }


    const callUpdate = async () => {
        try {
          const result = await fetch('/updateAddress', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              "Content-Type": 'application/json'
            },
            // credentials: 'include'
          });
    
          const data = await result.json();
          console.log(data);
    
          setImg(data.img);
          setEmail(data.email);
    
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

    const add = async (e) => {
        e.preventDefault();
        // console.log(email, address);
        const res = await fetch('/updateImg', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, img, newImg
            })
        });
        const data = await res.json();

        if (res.status === 400 || !data) {
            // window.alert(data.err);
            toast.error(data.err);
        } else {
            // window.alert('address updated successfully');
            toast.success('Passport Size Photo Updated Successfully');

        }
    };

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
                    <form ref={form} method='POST' type="submit"  >
                        <Card sx={{ boxShadow: 24,  minWidth: 650 }} >
                            <Container>
                                <Typography variant="h4">Update Passport Size Photo : </Typography>
                                {/* <FormControl>
                                    <lable>Your Email :</lable>
                                    <input name="img" value={img} className='mt-2'/>
                                </FormControl> */}
                                <FormControl>
                                    <InputLabel className="mt-2">New Passport Size Photo <span style={{ fontSize: "10px" }}> (Give Cloud Link) </span> :</InputLabel>
                                    <Input name="newImg" value={newImg} onChange={(e) => setNewImg(e.target.value)} className='mt-4' />
                                </FormControl>

                                <FormControl>
                                    <Button variant='contained' className='btn mt-4' type="submit" onClick={add}>Submit</Button>
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
    );
};

export default Img

