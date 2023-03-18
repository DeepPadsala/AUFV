import React from "react";
import { useEffect, useState } from "react";
import "./Result.css";
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
import Navbar from "./Navbar";

export default function Res() {
  const [result, setResult] = useState([]);

  useEffect(async () => {
    try {
      const res = await fetch(`/results`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(result);
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
              <div className="row mt-4">
                <div className="col-md-2">

                </div>
                <div className="col-md-8">
                  <h2 className="mt-4"> Results :</h2>
                  <div className="mt-4">

                  </div>
                  {result.map((data) => {

                    return (
                      <div key={data.year} style={{ textAlign: 'center', width: '300px', margin: 'auto', justifyContent: "center" }}>
                        <div className="card mt-3">
                          <h3>Year of Result : {data.year}</h3>
                          <a id="pdf" style={{ textAlign: 'center', justifyContent: "center" }} href={data.pdf} target="_blank">View Result of {data.year}</a>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-md-2">
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-10">

                </div>
                <div className="col-md-2">
                  <a href="https://sec.gujarat.gov.in/" style={{ backgroundColor: 'skyblue' }} target="_blank">Source</a>
                </div>
              </div>
              <div className="mt-5">

              </div>
            </Card>
          </Grid>

        </Grid>
      </div>

    </>
  );
}
