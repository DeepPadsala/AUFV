import React , { createContext, useReducer } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Voterid from "./components/Voterid";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Results from "./components/Results";
import Results from "./components/Results";
import Home from "./components/Home";
import Address from "./components/Address";
import Email from "./components/Email";
import Password from "./components/Password";
import Img from "./components/Img";

import AddResult from "./admin/AddResult";
import UpdateAddress from "./admin/UpdateAddress";
// import Logout from "./components/Logout";
import './App.css';
import { initialState, reducer } from "../src/reducer/useReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext();

const App = () => {

  
  const [state ,dispatch] = useReducer(reducer, initialState)

  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      
      <Routes>
      <Route path="/" exact element={<Home />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/voterid" exact element={<Voterid />} />
        {/* <Route path="/results" exact element={<Results />} /> */}
        <Route path="/results" exact element={<Results/>} />
        <Route path="/address" exact element={<Address />} />
        <Route path="/email" exact element={<Email />} />
        <Route path="/password" exact element={<Password />} />
        <Route path="/img" exact element={<Img />} />
        {/* <Route path="/logout" exact element={<Logout />} /> */}
        <Route path="/admin/addResult" exact element={<AddResult />} />
        <Route path="/admin/updateAddress" exact element={<UpdateAddress />} />

      </Routes>
      </UserContext.Provider> 
      <ToastContainer />
    </>
  )
}

export default App;
