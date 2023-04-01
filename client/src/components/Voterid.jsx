import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import hero1 from "../images/hero.jpg";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Document,
  Page,
  View,
  Text,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import hero from "../images/pass.jpg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from "./Navbar";

const styles = {
  page: {
    backgroundColor: "#ffffff",
    padding: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: 4,
    textDecoration: "none",
    fontWeight: "bold",
    textAlign: "center",
    display: "inline-block",
    margin: "20px 0",
    transition: "background-color 0.3s",
  },
  downloadButtonHover: {
    backgroundColor: "#3e8e41",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 170,
    height: 225,
    width: 160,
    justifyContent: "center",
  },
};

const Voterid = () => {
  const [name, setName] = useState("");
  const [fathername, setFathername] = useState("");
  const [sex, setSex] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");

  const navigate = useNavigate();
  const callId = async () => {
    try {
      const result = await fetch("/voterid", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // credentials: 'include'
      });

      const data = await result.json();
      console.log(data);
      if (data.Error) {
        // window.location.href = '/login';
        return navigate("/login");
      }
      setName(data.name);
      setFathername(data.fathername);
      setSex(data.sex);
      setDob(data.dob);
      setAddress(data.address);
      setImg(data.img);
      

      if (result.status !== 200) {
        const error = new Error(result.error);
        throw error;
      }
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };

  useEffect(() => {
    callId();
  }, []);

  const dateBirth = moment(dob).format("DD/MM/YYYY");
  // var today = new Date();
  // // var today = moment(today1).format("DD/MM/YYYY");

  // var age_now = today.getFullYear() - dob.getFullYear();
  // var m = today.getMonth() - dob.getMonth();

  // if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) 
  //   {
  //       age_now--;
  //   }
  //   console.log(age_now);

  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }
  

  const MyPdfComponent = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.subtitle}>--                      ELECTION COMMISSION OF INDIA                      --</Text>
          <Image style={styles.image} src={img} />
          {/* <Text style={styles.title}>{name}</Text> */}
          <Text style={styles.subtitle}>NAME                                              :  {name}</Text>
          <Text style={styles.subtitle}>
          FATHER'S / HUSBAND'S NAME    :  {fathername}
          </Text>
          <Text style={styles.subtitle}>SEX                                                 :  {sex}</Text>
          <Text style={styles.subtitle}>DATE OF BIRTH                              :  {dateBirth}</Text>
          <Text style={styles.subtitle}>ADDRESS                                       :  {address}</Text>
          {/* <Text style={styles.subtitle}>NAME                          :</Text> */}
          {/* <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices libero vel erat tincidunt pretium. Suspendisse potenti. Nunc vitae augue et arcu suscipit volutpat.
          </Text>
          <Text style={styles.subtitle}>Section 2</Text>
          <Text style={styles.text}>
            Fusce dictum magna nec ex commodo, id rhoncus justo fermentum. Praesent eget ipsum suscipit, rhoncus turpis in, euismod ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
          </Text> */}
        </View>
      </Page>
    </Document>
  );

  // const MyPdfComponent = () => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <View>
  //         <Text style={styles.subtitle}>--                      ELECTION COMMISSION OF INDIA                      --</Text>
  //         <Image style={styles.image} src={img} />
  //         {/* <Text style={styles.title}>{name}</Text> */}
  //         <Text style={styles.subtitle}>NAME                                              :  {name}</Text>
  //         <Text style={styles.subtitle}>
  //         FATHER'S / HUSBAND'S NAME    :  {fathername}
  //         </Text>
  //         <Text style={styles.subtitle}>SEX                                                 :  {sex}</Text>
  //         <Text style={styles.subtitle}>DATE OF BIRTH                              :  {dateBirth}</Text>
  //         <Text style={styles.subtitle}>ADDRESS                                       :  {address}</Text>
  //         {/* <Text style={styles.subtitle}>NAME                          :</Text> */}
  //         {/* <Text style={styles.text}>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices libero vel erat tincidunt pretium. Suspendisse potenti. Nunc vitae augue et arcu suscipit volutpat.
  //         </Text>
  //         <Text style={styles.subtitle}>Section 2</Text>
  //         <Text style={styles.text}>
  //           Fusce dictum magna nec ex commodo, id rhoncus justo fermentum. Praesent eget ipsum suscipit, rhoncus turpis in, euismod ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
  //         </Text> */}
  //       </View>
  //     </Page>
  //   </Document>
  // );

  // const MyPdfComponent = () => {
  //   const pdf = new jsPDF();

  //   // Add image to the PDF
  //   const imgData = {img};
  //   pdf.addImage(imgData, 'JPEG', 10, 10, 50, 50);

  //   // Add text to the PDF
  //   pdf.text(`Name: ${name}`, 10, 70);
  //   pdf.text(`Father's / Husband's Name: ${fathername}`, 10, 80);
  //   pdf.text(`Sex: ${sex}`, 10, 90);
  //   pdf.text(`Date of Birth: ${dob}`, 10, 100);
  //   pdf.text(`Address: ${address}`, 10, 110);

  //   // const doc = new jsPDF();

  //   // doc.setFontSize(20);
  //   // doc.text('Voter ID Card', 80, 15);

  //   // doc.autoTable({
  //   //   startY: 30,
  //   //   head: [['Field', 'Value']],
  //   //   body: [
  //   //     ['Name', name],
  //   //     ["Father's / Husband's Name", fathername],
  //   //     ['Sex', sex],
  //   //     ['Date of Birth', dob],
  //   //     ['Address', address],
  //   //   ],
  //   // });

  //   // Save the PDF
  //   pdf.save('voter-id.pdf');
  // };
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
  const age = calculateAge(dateBirth);
  if(age>=18){
  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div className="row mt-4">
          <div className="col-md-4"></div>
          <div className="col-md-6">
            <Card sx={{ maxWidth: 500, boxShadow: 24 }}>
              <div className="row mt-5">
                <div className="col-md-1"></div>

                <div className="col-md-10">
                  <h4>ELECTION COMMISSION OF INDIA</h4>
                </div>
                <div className="col-md-1"></div>
              </div>
              {/* <CardActionArea> */}
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  {/* <CardMedia
                component="img"
                height="345"
                width="10"
                image=""
                alt="Passport Size Photo"
              /> */}
                  <img
                    src={img}
                    className="mt-4"
                    style={{ height: 300, width: 230 }}
                    alt={name}
                  />
                </div>
                <div className="col-md-3"></div>
              </div>
              {/* <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              NAME : MYNAME
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>

        </CardActionArea> 
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions> */}

              <div className="row mt-4">
                <div className="col-md-1"></div>
                <div className="col-md-4">NAME</div>
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  :
                </div>
                <div className="col-md-4">{name}</div>
                <div className="col-md-1"></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-1"></div>
                <div className="col-md-4">FATHER'S / HUSBAND'S NAME</div>
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  :
                </div>
                <div className="col-md-4">{fathername}</div>
                <div className="col-md-1"></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-1"></div>
                <div className="col-md-4">SEX</div>
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  :
                </div>
                <div className="col-md-4">{sex}</div>
                <div className="col-md-1"></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-1"></div>
                <div className="col-md-4">DATE OF BIRTH</div>
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  :
                </div>
                <div className="col-md-4">{dateBirth}</div>
                <div className="col-md-1"></div>
              </div>

              <div className="row mt-3">
                <div className="col-md-1"></div>
                <div className="col-md-4">ADDRESS</div>
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  :
                </div>
                <div className="col-md-4">{address}</div>
                <div className="col-md-1"></div>
              </div>

              <div className="row mt-4">
                <div className="col-md-4"></div>
                <div className="col-md-4" style={{ textAlign: "center" }}>
                  <div>
                    <PDFDownloadLink
                      document={<MyPdfComponent />}
                      fileName="voterid.pdf"
                    >
                      {({ blob, url, loading, error }) => (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.downloadButton}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor =
                              styles.downloadButtonHover.backgroundColor;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor =
                              styles.downloadButton.backgroundColor;
                          }}
                        >
                          {loading ? "Loading document..." : "Download VoterID"}
                        </a>
                      )}
                    </PDFDownloadLink>
                    {/* <button onClick={generatePdf}>Generate PDF</button> */}
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
            </Card>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>

    // <div className='pt-5 pl-5'>
    //   <div className="container">
    //     <form method='GET'>

    //       <div class="box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "30%", height: "200px", border: "3px solid #f7a239" }} >
    //         <img src={hero} style={{ width: "100%", height: "100%" }} alt="dp" />
    //       </div>

    //       <div className="row">
    //         <div className="col-md-12 pl-5 about-info">

    //           <div className="fade show active" id="home" >

    //             <div className="row">
    //               <div className="col-md-6">
    //                 <label>NAME                         :</label>
    //               </div>
    //               <div className="col-md-6">
    //                 <p>{name}</p>
    //               </div>
    //             </div>

    //             <div className="row mt-3">
    //               <div className="col-md-6">
    //                 <label>FATHER'S / HUSBAND'S NAME    :</label>
    //               </div>
    //               <div className="col-md-6">
    //                 <p >{fathername}</p>
    //               </div>
    //             </div>

    //             <div className="row mt-3">
    //               <div className="col-md-6">
    //                 <label>SEX                          :</label>
    //               </div>
    //               <div className="col-md-6">
    //                 <p>{sex}</p>
    //               </div>
    //             </div>

    //             <div className="row mt-3">
    //               <div className="col-md-6">
    //                 <label >DATE OF BIRTH                :</label>
    //               </div>
    //               <div className="col-md-6">
    //                 <p>{dateBirth}</p>
    //               </div>
    //             </div>

    //             <div className="row mt-3">
    //               <div className="col-md-6">
    //                 <label >ADDRESS                      :</label>
    //               </div>
    //               <div className="col-md-6">
    //                 <p >{address}</p>
    //               </div>
    //             </div>

    //             <div>
    //               <PDFDownloadLink document={<MyPdfComponent />} fileName="example.pdf">
    //                 {({ blob, url, loading, error }) => (
    //                   <a
    //                     href={url}
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                     style={styles.downloadButton}
    //                     onMouseEnter={(e) => {
    //                       e.target.style.backgroundColor = styles.downloadButtonHover.backgroundColor;
    //                     }}
    //                     onMouseLeave={(e) => {
    //                       e.target.style.backgroundColor = styles.downloadButton.backgroundColor;
    //                     }}
    //                   >
    //                     {loading ? 'Loading document...' : 'Download VoterID'}
    //                   </a>
    //                 )}
    //               </PDFDownloadLink>
    //             </div>
    //           </div>

    //         </div>

    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}else{
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "2rem",
    backgroundImage: "linear-gradient(to bottom right, #a2deed, #87cefa)",
    fontFamily: "Montserrat, sans-serif",
  };

  // const headingStyle = {
  //   textAlign: "center",
  //   color: "#000000",
  //   fontSize: "4rem",
  //   textShadow: "2px 2px #fff",
  //   marginBottom: "3rem",
  // };

  const paragraphStyle = {
    lineHeight: "1.5",
    fontSize: "1.5rem",
    color: "#fff",
    textAlign: "justify",
    margin: "0 auto 2rem",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #333",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    maxWidth: "60%",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        {/* <h1 style={headingStyle}>Municipal Corporation : Election Process</h1> */}
        <p style={paragraphStyle}>
          You are not eligible for the voter id because you are not 18 or older.
        </p>
        </div>
    </>
  )
}
};

export default Voterid;
