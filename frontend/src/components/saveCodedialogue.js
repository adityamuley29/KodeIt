import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import closeCircle from "../assets/icons/close-circle-outline.svg";
import { useToasts } from "react-toast-notifications";

function SaveCodedialogue({ language }) {
  const { addToast } = useToasts();
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
        `${process.env.REACT_APP_BACKEND_BASE_URL}/save-code`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        addToast("File Saved Successfully !", {
          appearance: "success",
          autoDismiss: true,
        });
        setFileName("");
        history("/");
      }

      // console.log(response);
    } catch (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
      // console.log(error);
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
