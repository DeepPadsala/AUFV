import React, { useContext, useState } from "react";
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
import { UserContext } from "../App";
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';
import Navbar from "./Navbar";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`



const Login = () => {
  const [cookies, setCookie] = useCookies(['jwtoken', 'isUser']);
  const { state, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });
    const data = await res.json();

    if (res.status === 400 || !data) {
      // window.alert(data.err);
      toast.error(data.err);
    }
    else {
      dispatch({ type: "USER", payload: true })
      console.log("Data : ", data);
      setCookie('jwtoken', data.token, { expires: new Date(Date.now() + 25892000000), path: '/' });
      setCookie('isUser', data.isUser, { expires: new Date(Date.now() + 25892000000), path: '/' });
      // window.alert(data.message);
      toast.success(data.message);

      // window.location.href='/'; successfully login
      navigate('/home');
    }

  }

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
          <Card sx={{ minWidth: 650, boxShadow: 24 }}>
            <form type="submit">
              <Container>
                <Typography variant="h4" className="mt-4">Login</Typography>
                <FormControl>
                  <InputLabel>User ID</InputLabel>
                  <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl>
                  <InputLabel>Password</InputLabel>
                  <Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <FormControl>
                  <Button variant='contained' type="submit" className='mt-4' onClick={loginUser}>Login</Button>
                </FormControl>
                <div className="mt-5">

                </div>

              </Container>
            </form>
          </Card>
        </Grid>

      </Grid>
    </div>
    </>
  );
};

export default Login;

// import React from "react";
// import { Box, TextField, Typography, Button } from "@mui/material";

// const Login = () => {
//   return (
//     <div>
//       <form>
//         <Box
//           display="flex"
//           flexDirection={"column"}
//           backgroundColor='skyblue'
//           maxWidth={400}
//           alignContent={"center"}
//           justifyContent={"center"}
//           margin={"auto"}
//           marginTop={5}
//           padding={10}
//           borderRadius={5}
//           boxShadow={"5px 5px 10px #ccc"}
//           sx={{
//             ":hover": {
//               boxShadow: "10px 10px 20px #ccc",
//             },
//           }}
//         >
//           <Typography variant="h2" padding={3} textAlign="center">
//             Login
//           </Typography>
//           <TextField
//             margin={"normal"}
//             type={"text"}
//             variant={"outlined"}
//             placeholder={"Name"}
//           />
//           <TextField
//             margin={"normal"}
//             type={"email"}
//             variant={"outlined"}
//             placeholder={"Email"}
//           />
//           <TextField
//             margin={"normal"}
//             type={"password"}
//             variant={"outlined"}
//             placeholder={"Password"}
//           />
//           <Button>Login</Button>
//         </Box>
//       </form>
//     </div>
//   );
// };

// export default Login;
