import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import closeCircle from "../assets/icons/close-circle-outline.svg";

function SaveCodedialogue({ language }) {
  const history = useNavigate();
  const [fileName, setFileName] = useState("");

  const code = localStorage.getItem("code");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const token = user.token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: fileName,
      inputCode: code,
      language,
      userId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/save-code",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        window.alert("File Saved Successfully !");
        setFileName("");
        history("/");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="saveCodeContainer">
      <img
        id="closeRegister"
        onClick={() => {
          history("/");
        }}
        src={closeCircle}
      />

      <div className="saveCodeMain">
        <h3 className="saveCodeTitle">Save File</h3>
        <form onSubmit={handleSubmit}>
          <label>Name of File:</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
            }}
            required
          />
          <button type="submit">Done</button>
        </form>
      </div>
    </div>
  );
}

export default SaveCodedialogue;
