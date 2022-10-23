import React from "react";
import { useNavigate } from "react-router-dom";
import saveCodeImage from "../assets/icons/save-outline.svg";

function SaveCode({ language, code }) {
  const history = useNavigate();

  return (
    <a
      onClick={() => {
        history("/save-code");
      }}
      className="saveCodeImage"
    >
      <img src={saveCodeImage} alt="save code button" />
      <span className="Tooltip">Save Code</span>
    </a>
  );
}

export default SaveCode;
