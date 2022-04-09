import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./topbar.css";

import { Context } from "../../context/Context";
import { prefixImgURI } from "../../config";

const Topbar = () => {
    const { user, dispatch } = useContext(Context);

    const handleLogout = (e) => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fa-brands fa-facebook-square"></i>
                <i className="topIcon fa-brands fa-twitter-square"></i>
                <i className="topIcon fa-brands fa-pinterest-square"></i>
                <i className="topIcon fa-brands fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <div className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">
                            HOME
                        </Link>
                    </li>
                    <li className="topListItem">ABOUT</li>
                    <li className="topListItem">CONTACT</li>
                    <li className="topListItem">
                        <Link className="link" to="/write">
                            WRITE
                        </Link>
                    </li>
                    {user && (
                        <>
                            <Link
                                className="link"
                                to={`/?user=${user.username}`}
                            >
                                <li className="topListItem">MY POSTS</li>
                            </Link>
                            <li className="topListItem" onClick={handleLogout}>
                                LOGOUT
                            </li>
                        </>
                    )}
                </div>
            </div>
            <div className="topRight">
                {user ? (
                    <Link className="link" to="/settings">
                        <img
                            className="topImg"
                            src={prefixImgURI + user.profilePic}
                            alt=""
                        />
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to="/login">
                                LOGIN
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link className="link" to="/register">
                                REGISTER
                            </Link>
                        </li>
                    </ul>
                )}
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    );
};

export default Topbar;
