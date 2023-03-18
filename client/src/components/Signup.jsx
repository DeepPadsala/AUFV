// import React from 'react'

// const Signup = () => {
//   return (
//     <div>
//       <h1>Wlcome signup</h1>
//     </div>
//   )
// }

// export default Signup

import React, { useState } from "react";
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
  Select,
  MenuItem,
  TextField,
  Card,
  Grid
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from "./Navbar";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const Signup = () => {
  // const values = {
  //   someDate: "2017-05-24",
  // };

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "", email: "", password: "", cpassword: "", fathername: "", address: "", img: "", dob: "", sex: "",
  });
  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword, fathername, address, img, dob, sex } = user;

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password, cpassword, fathername, address, img, dob, sex
      })
    });
    const data = await res.json();

    if (!data.message) {
      // window.alert(data.err);
      toast.error(data.err);
      console.log("invalid signup");
    }
    else {
      // window.alert(data.message);
      toast.success(data.message);
      console.log("signup successful");

      navigate("/login");
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
        <div className="mt-5">

        </div>
        <Grid item xs={3}>
          <Card sx={{ minWidth: 800, boxShadow: 24 }}>
            <form type="submit">
              <Container method="POST">
                <Typography className="mt-2" variant="h4">Signup</Typography>
                <FormControl>
                  <InputLabel>Name <span style={{ fontSize: "10px" }}> (Give Full Name) </span></InputLabel>
                  <Input
                    name="name"
                    value={user.name}
                    onChange={handleInputs}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel>Email</InputLabel>
                  <Input name="email"
                    value={user.email} onChange={handleInputs}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel>Password</InputLabel>
                  <Input name="password"
                    value={user.password} onChange={handleInputs}
                    type="password"
                  />
                </FormControl>
                <FormControl>
                  <InputLabel>Comfirm Password</InputLabel>
                  <Input name="cpassword"
                    type="password"
                    value={user.cpassword} onChange={handleInputs}

                  />
                </FormControl>
                <FormControl>
                  <InputLabel>Father's Name <span style={{ fontSize: "10px" }}> (Give Full Name) </span></InputLabel>
                  <Input name="fathername"
                    value={user.fathername} onChange={handleInputs}

                  />
                </FormControl>

                <FormControl>
                  <InputLabel>Passport Size Photo <span style={{ fontSize: "10px" }}> (Give Cloud Link) </span></InputLabel>
                  <Input name="img"
                    value={user.img} onChange={handleInputs}
                  />
                </FormControl>

                {/* <FormControl>
                <InputLabel>Address</InputLabel>
                <Input name="address"
                  value={user.address} onChange={handleInputs}

                />
              </FormControl> */}
                <FormControl>
                  <label>Address :</label>
                  <textarea name="address" rows={4} value={user.address} onChange={handleInputs} />
                </FormControl>


                {/* <div className="App"> */}
                <TextField
                  name="dob"
                  label="Date of Birth"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  value={user.dob}
                  onChange={handleInputs}
                // defaultValue={values.someDate}
                />
                {/* </div> */}

                <FormControl>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={gender}
                    name="sex"
                    label="Sex"
                    // size="small"
                    value={user.sex}
                    onChange={handleInputs}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    {/* <MenuItem value="SDE3">TESTER</MenuItem> */}
                  </Select>
                </FormControl>
                <FormControl>
                  <Button variant="contained" type="submit" name="signup" value="signup" onClick={PostData}>Signup</Button>
                </FormControl>
                <div className="mt-5">

                </div>
              </Container>
            </form>
          </Card>
        </Grid>
        <div className="mt-5">

        </div>
      </Grid>
    </div>
</>
  );
};

export default Signup;
