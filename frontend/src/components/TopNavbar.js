import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TopNavbar() {
  const history = useNavigate();
  const isUserSignin = localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem("user"));
  const [userLinks, setUserLinks] = useState(false);

  const handleSignout = () => {
    localStorage.removeItem("user");
    history("/");
  };

  return (
    <div className="topNavbar">
      {isUserSignin ? (
        <div className="topNavbar-links">
          <div>
            <span
              onClick={() => {
                setUserLinks(false);
                history("/user/my-files");
              }}
            >
              My Files
            </span>
          </div>
          <span
            onClick={() => {
              setUserLinks(true);
            }}
          >
            {user.email} <span>|</span>
          </span>

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
            Register <span>|</span>
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
