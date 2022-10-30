import React from "react";
import { useToasts } from "react-toast-notifications";
import CopyIcon from "../assets/icons/clipboard-outline.svg";

function CopyCodeToClipBoard({ code }) {
  const { addToast } = useToasts();
  return (
    <a className="codeAreaCopyCodeBtn">
      <img
        src={CopyIcon}
        alt="Btn here"
        onClick={() => {
          navigator.clipboard.writeText(code);
          addToast("Successfully Code Copied to ClipBoard !", {
            appearance: "success",
            autoDismiss: true,
          });
        }}
      />
      <span className="Tooltip">Copy Code</span>
    </a>
  );
}

export default CopyCodeToClipBoard;
