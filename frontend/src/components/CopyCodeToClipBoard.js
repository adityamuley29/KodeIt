import React from "react";
import CopyIcon from "../assets/icons/clipboard-outline.svg";

const copyCodeToClipBoard = (input) => {
  navigator.clipboard.writeText(input);
  window.alert("Successfully Code Copied to ClipBoard !");
};

function CopyCodeToClipBoard({ code }) {
  return (
    <a className="codeAreaCopyCodeBtn">
      <img
        src={CopyIcon}
        alt="Btn here"
        onClick={() => {
          copyCodeToClipBoard(code);
        }}
      />
      <span className="Tooltip">Copy Code</span>
    </a>
  );
}

export default CopyCodeToClipBoard;
