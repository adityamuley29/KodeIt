import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import closeCircle from "../assets/icons/close-circle-outline.svg";

function RegisterUser(props) {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    const payload = user;

    try {
      const data = await axios.post(
        "http://localhost:5000/api/users/register",
        payload
      );

      console.log(data);
      if (data.status === 201) {
        await window.alert(data.data.message);
        history("/user/signin");
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
        <h3>Register</h3>
        <form onSubmit={handleRegisterUser}>
          <input
            placeholder="Enter Your Full Name"
            value={name}
            type="text"
            name="name"
            onChange={onUserChange}
            required
          />

          <input
            placeholder="Enter Your Email"
            value={email}
            type="email"
            name="email"
            onChange={onUserChange}
            required
          />

          <input
            placeholder="Enter Your Password"
            value={password}
            type="password"
            name="password"
            onChange={onUserChange}
            required
          />

          <button id="registerSubmit" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
