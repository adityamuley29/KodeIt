import React from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import saveCodeImage from "../assets/icons/save-outline.svg";

function SaveCode({ language, code }) {
  const { addToast } = useToasts();
  const history = useNavigate();
  const user = localStorage.getItem("user");

  return (
    <a
      onClick={() => {
        user
          ? history("/save-code")
          : addToast("Please Sign In to Save Code !", {
              appearance: "warning",
              autoDismiss: true,
            });
      }}
      className="saveCodeImage"
    >
      <img src={saveCodeImage} alt="save code button" />
      <span className="Tooltip">Save Code</span>
    </a>
  );
}

export default SaveCode;
