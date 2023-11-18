import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import closeCircle from "../assets/icons/close-circle-outline.svg";
const { REACT_APP_BACKEND_BASE_URL } = process.env;

function RegisterUser(props) {
  const { addToast } = useToasts();
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
        `${REACT_APP_BACKEND_BASE_URL}/api/users/register`,
        payload
      );

      console.log(data);
      if (data.status === 201) {
        await addToast(data.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
        // await window.alert(data.data.message);
        history("/user/signin");
      }
    } catch (error) {
      // console.log(error.response);
      addToast(JSON.stringify(error.response.data.message), {
        appearance: "error",
        autoDismiss: true,
      });
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
