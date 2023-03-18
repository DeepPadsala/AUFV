import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
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

  const headingStyle = {
    textAlign: "center",
    color: "#000000",
    fontSize: "4rem",
    textShadow: "2px 2px #fff",
    marginBottom: "3rem",
  };

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

  const buttonStyle = {
    backgroundColor: "#fff",
    color: "#1e90ff",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: "1rem 0",
    boxShadow: "5px 5px 5px #333",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    textDecoration: "none",
    outline: "none",
  };

  // const buttonHoverStyle = {
  //   backgroundColor: "#1e90ff",
  //   color: "#fff",
  //   transform: "translate(2px, 2px)",
  //   boxShadow: "3px 3px 3px #333",
  // };
  const navigate = useNavigate();

  const navToResult = () => {
    navigate("/results");
  };
  useEffect(() => {}, []);

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <h1 style={headingStyle}>Municipal Corporation : Election Process</h1>
        <p style={paragraphStyle}>
          રાજય ચૂંટણી પંચે જે જિલ્લા માં મહાનગરપાલિકા આવેલી હોય, તેની
          ચૂંટણીલક્ષી કામગીરી કરવા માટે જે-તે જિલ્લાકના કલેકટરને શહેર ચૂંટણી
          અધિકારી તરીકે નીમે છે. આ શહેર ચૂંટણી અધિકારી-વ-કલેકટરશ્રી રાજય ચૂંટણી
          પંચની દેખરેખ, માર્ગદર્શન અને નિયંત્રણને આધીન રહીને કોર્પોરેશનની ચૂંટણી
          માટેની સંપૂર્ણ કામગીરી કરે છે.
        </p>
        <p style={paragraphStyle}>
          રાજય ચૂંટણી પંચ કોર્પોરેશનની ચૂંટણીઓ કરવા માટે થયેલ જોગવાઈઓને આધીન
          રહીને પોતે જરૂરી ગણે તેટલા ચૂંટણી અધિકારીઓ(આર.ઓ.)ની અને મદદનીશ ચૂંટણી
          અધિકારીઓ(એ.આર.ઓ.)ની નિમણૂંક કરે છે. આ નીમાયેલ ચૂંટણી અધિકારીઓ અને
          મદદનીશ ચૂંટણી અધિકારીઓ શહેર ચૂંટણી અધિકારી-વ-કલેકટરશ્રીનાં સામાન્ય
          માર્ગદર્શન અને દેખરેખ હેઠળ જે-તે ચૂંટણીઓ સંલગ્નેની કામગીરી સંભાળે છે.
        </p>
        <p style={paragraphStyle}>
          રાજય ચૂંટણી પંચ, ચૂંટણીનાં મહાનગરપાલિકા માટેના ઈરાદા(મહાનગરપાલિકા
          ચૂંટણી નિયમો-૧૯૯૪ ના નિયમ-પ)ને આધીન રહીને નમૂના-(૧) મુજબની
          જાહેરનામાઓની પ્રસિઘ્ધિ/ચૂંટણીની નોટિસ પ્રસિઘ્ધ કરે છે. તે નોટિસમાં
          ઉમેદવારીપત્રો ભરવાની છેલ્લી તારીખ, ઉમેદવારીપત્રોની ચકાસણી માટેની
          તારીખ, ઉમેદવારી પાછી ખેંચી લેવાની તારીખ, ચૂંટણીની/મતદાનની તારીખ વગેરે
          જણાવે છે. તેમાં મુખ્યખત્વે મુદ્દાઓની જોગવાઈઓ જાણકારી માટે નીચે મુજબ
          છે.
        </p>
        <p style={paragraphStyle}>
          ઉમેદવારીપત્રો ભરવાની છેલ્લીય તારીખ, જાહેરનામા પ્રસિઘ્ધણ થયાની તારીખ
          પછીનો પાંચમો દિવસ રહેશે.
        </p>
        <p style={paragraphStyle}>
          ઉમેદવારીપત્રોની ચકાસણી માટેની તારીખ, ઉમેદવારીપત્રો ભરવાની છેલ્લી તારીખ
          પછીનો બીજો દિવસ રહેશે.
        </p>
        <p style={paragraphStyle}>
          ઉમેદવારીપત્રો પાછા ખેંચવાની તારીખ, ઉમેદવારીપત્રોની ચકાસણી માટેની તારીખ
          પછીનો દિવસ રહેશે.
        </p>
        <p style={paragraphStyle}>
          મતદાન/ચૂંટણીની તારીખ, ઉમેદવારી પાછી ખેંચી લેવાની તારીખનાં ૧૦(દસ) દિવસો
          કરતાં વહેલી હોવી જોઈશે નહીં.
        </p>
        <button
          // href=navigat("/result")
          style={buttonStyle}
          onClick={navToResult}
          //   onMouseEnter={(e) => (e.target.style = { ...buttonStyle, ...buttonHoverStyle })}
          //   onMouseLeave={(e) => (e.target.style = buttonStyle)}
        >
          Results
        </button>
      </div>
    </>
  );
};

export default Home;
