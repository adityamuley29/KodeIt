import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import closeCircle from "../assets/icons/close-circle-outline.svg";

function SigninUser() {
  const history = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const handleSignInUser = async (e) => {
    e.preventDefault();

    const payload = user;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signin",
        payload
      );
      
      if(response.status === 200){
        localStorage.setItem('user',JSON.stringify(response.data))
        history('/')
      }
      
    } catch (error) {
      console.log(error.response);
      await window.alert(JSON.stringify(error.response.data.message));
    }

    
    
  };

  const onUserChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="registeUserContainer">
      <img
        id="closeRegister"
        src={closeCircle}
        alt="close button"
        onClick={() => {
          history("/");
        }}
      />
      <div className="registeUserForm">
        <h3>Sign In</h3>
        <form onSubmit={handleSignInUser}>
          <input
            placeholder="Enter Your Email"
            type="email"
            name="email"
            value={email}
            onChange={onUserChange}
            required
          />

          <input
            placeholder="Enter Your Password"
            type="password"
            name="password"
            value={password}
            onChange={onUserChange}
            required
          />

          <button id="registerSubmit" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SigninUser;
