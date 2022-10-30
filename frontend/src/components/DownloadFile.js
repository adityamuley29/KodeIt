import axios from "axios";
import React from "react";
import { useToasts } from "react-toast-notifications";
import codeDownloadImage from "../assets/icons/code-download-outline.svg";

function DownloadFile({ language, code, jobId }) {
  const { addToast } = useToasts();
  // below function is to download file
  const handleDownloadFile = () => {
    try {
      const fileData = code;
      //blob is file like object
      const blob = new Blob([fileData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = jobId ? `${jobId}.${language}` : `main.${language}`;
      link.href = url;
      link.click();
      addToast("Successfully Downloaded File !", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      console.log(error);
    }
  };

  return (
    <a onClick={handleDownloadFile} className="codeDownloadImage">
      <img src={codeDownloadImage} alt="download button" />
      <span className="Tooltip">Download Code</span>
    </a>
  );
}

export default DownloadFile;
