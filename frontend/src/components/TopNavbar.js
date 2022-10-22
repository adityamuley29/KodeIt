import React from "react";
import { json, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

function TopNavbar() {
  const history = useNavigate();
  const isUserSignin = localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSignout = () => {
    localStorage.removeItem("user");
    history("/");
  };

  return (
    <div className="topNavbar">
      {isUserSignin ? (
        <div className="topNavbar-links">
          <span>{user.email}</span>
          <span className="signout" id="signoutBtn" onClick={handleSignout}>
            Sign out
          </span>
        </div>
      ) : (
        <div className="topNavbar-links">
          <span
            onClick={() => {
              history("/user/register");
            }}
            className="register"
          >
            Register
          </span>
          <span
            onClick={() => {
              history("/user/signin");
            }}
            className="signin"
          >
            Sign In
          </span>
        </div>
      )}
    </div>
  );
}

export default TopNavbar;
