import React from "react";
import saveCodeImage from "../assets/icons/save-outline.svg";

function SaveCode() {
  const handleCodeSave = () => {};
  return (
    <a onClick={handleCodeSave} className="saveCodeImage">
      <img src={saveCodeImage} alt="save code button" />
      <span className="Tooltip">Save Code</span>
    </a>
  );
}

export default SaveCode;
