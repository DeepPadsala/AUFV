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
import Navbar from "../components/Navbar";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const AddResult = () => {
  // const values = {
  //   someDate: "2017-05-24",
  // };

  const navigate = useNavigate();

  const [result, setResult] = useState({
    year: "", pdf: "",
  });
  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setResult({ ...result, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();

    const { year, pdf } = result;

    const res = await fetch("/admin/addResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        year, pdf
      })
    });
    const data = await res.json();

    if (!data.message) {
      window.alert(data.err);
      console.log("invalid");
    }
    else {
      window.alert(data.message);
      console.log("Result Add successfully");

      navigate("/home");
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
                <Typography className="mt-2" variant="h4">Add Result </Typography>
                <FormControl>
                  <InputLabel>Year </InputLabel>
                  <Input
                    name="year"
                    value={result.year}
                    onChange={handleInputs}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel>PDF <span style={{ fontSize: "10px" }}> (Give Cloud Link) </span></InputLabel>
                  <Input name="pdf"
                    value={result.pdf} onChange={handleInputs}
                  />
                </FormControl>
                
                <FormControl>
                  <Button className="mt-4" variant="contained" type="submit" name="addResult" value="addResult" onClick={PostData}>Add Result</Button>
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

export default AddResult;