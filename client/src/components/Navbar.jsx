import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../App";
// import Cookies from 'js-cookie';
import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies(["jwtoken", "isUser"]);
    const navigate = useNavigate();
    const navStyle = {
        backgroundColor: "#fff",
        color: "#1e90ff",
    };
    console.log("cook : ", cookies);
    const doLogout = () => {
        removeCookie("jwtoken", { expires: new Date() - 1 });
        removeCookie("isUser", { expires: new Date() - 1 });
        navigate("/login");
        // fetch('/logout', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         "Content-Type": "application/json"
        //     },
        //     // credentials: "include"
        // }).then((response) => {
        //     dispatch({ type: "USER", payload: false })

        //     navigate('/login');
        //     if (response.statusCode !== 200) {
        //         const error = new Error(response.error);
        //         throw error;
        //     }
        // }).catch((error) => {
        //     console.log(error);
        // });
    };

    const RenderMenu = () => {
        // if (state) {
        return (
            <>
                {undefined === cookies["isUser"] || "true" === cookies["isUser"] ? (
                    <nav
                        className="navbar sticky-top navbar-expand-lg navbar-light bg-light"
                        style={navStyle}
                    >
                        <NavLink className="navbar-brand" to="/home">
                            AUFV
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/home">
                                        Home <span class="sr-only">(current)</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/results">
                                        Results
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/voterid">
                                        Voter_ID
                                    </NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink className="nav-link" to="/update">
                                        Update_Address
                                    </NavLink>
                                </li> */}
                                <li class="nav-item dropdown">
                                    <a
                                        class="nav-link dropdown-toggle"
                                        ṭo="#"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Update
                                    </a>
                                    <div className="dropdown-menu">
                                        <NavLink className="dropdown-item" to="/address">
                                            Address
                                        </NavLink>
                                        <div className="dropdown-divider"></div>
                                        <NavLink className="dropdown-item" to="/email">
                                            Email
                                        </NavLink>
                                        <div className="dropdown-divider"></div>
                                        <NavLink className="dropdown-item" to="/img">
                                            Passport Size Photo
                                        </NavLink>
                                        <div className="dropdown-divider"></div>
                                        <NavLink className="dropdown-item" to="/password">
                                            Password
                                        </NavLink>
                                    </div>
                                </li>
                                {/* <li class="nav-item">
                            <a class="nav-link disabled">Disabled</a>
                        </li> */}
                                {undefined === cookies["jwtoken"] ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">
                                                Login
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signup">
                                                Signup
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <button
                                            className="nav-link btn btn-link"
                                            onClick={doLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </nav>
                ) : (
                    <nav
                        className="navbar sticky-top navbar-expand-lg navbar-light bg-light"
                        style={navStyle}
                    >
                        <NavLink className="navbar-brand" to="/home">
                            AUFV(Admin Panel)
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/home">
                                        Home <span class="sr-only">(current)</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/results">
                                        Results <span class="sr-only">(current)</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/voterid">
                                        Voter_ID
                                    </NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/addResult">
                                        Add_Result
                                    </NavLink>
                                </li> */}
                                <li class="nav-item dropdown">
                                    <a
                                        class="nav-link dropdown-toggle"
                                        ṭo="#"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Result
                                    </a>
                                    <div className="dropdown-menu">
                                        <NavLink className="dropdown-item" to="/admin/addResult">
                                            Add
                                        </NavLink>
                                        <div className="dropdown-divider"></div>
                                        <NavLink className="dropdown-item" to="/admin/updateResult">
                                            Update
                                        </NavLink>
                                        <div className="dropdown-divider"></div>
                                        <NavLink className="dropdown-item" to="/admin/deleteResult">
                                            Delete
                                        </NavLink>
                                        
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/updateAddress">
                                        Update_User_Address
                                    </NavLink>
                                </li>
                                <li class="nav-item dropdown">
                                    <a
                                        class="nav-link dropdown-toggle"
                                        ṭo="#"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Update
                                    </a>
                                    <div className="dropdown-menu">
                                        <NavLink className="dropdown-item" to="/address">
                                            Address
                                        </NavLink>
                                        <div className="dropdown-divider"></div>
                                        <NavLink className="dropdown-item" to="/email">
                                            Email
                                        </NavLink>
                                        <div className="dropdown-divider"></div>
                                        <NavLink className="dropdown-item" to="/img">
                                            Passport Size Photo
                                        </NavLink>
                                        <div className="dropdown-divider"></div>
                                        <NavLink className="dropdown-item" to="/password">
                                            Password
                                        </NavLink>
                                    </div>
                                </li>

                                {undefined === cookies["jwtoken"] ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">
                                                Login
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signup">
                                                Signup
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <button
                                            className="nav-link btn btn-link"
                                            onClick={doLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </nav>
                )}
            </>
        );

        // }
    };
    return (
        <>
            <RenderMenu />

            {/* <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled">Disabled</a>
                        </li> */}
        </>
    );
};

export default Navbar;
