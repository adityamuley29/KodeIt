import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import closeCircle from "../assets/icons/close-circle-outline.svg";
import CopyIcon from "../assets/icons/clipboard-outline.svg";
import axios from "axios";

const ShareCodeDialogue = () => {
  const history = useNavigate();
  const [generatedShareLink, setGeneratedShareLink] = useState("");

  useEffect(() => {
    generateShareLink();
  }, []);

  const generateShareLink = async () => {
    const code = localStorage.getItem("code");
    const language = localStorage.getItem("language");
    try {
      const payload = {
        code,
        language,
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/share-code/slug-generate",
        payload
      );
      setGeneratedShareLink(`http://localhost:3000/${data.link}`);
      console.log(data.link);
    } catch (error) {
      console.log(error);
    }
  };

  const copyCodeToClipBoard = (input) => {
    navigator.clipboard.writeText(input);
    window.alert("Successfully Link Copied to ClipBoard !");
  };
  return (
    <div className="saveCodeContainer">
      <img
        id="closeRegister"
        onClick={() => {
          history("/");
        }}
        alt="close btn"
        src={closeCircle}
      />

      <div className="saveCodeMain">
        <h3 className="saveCodeTitle">Share Code</h3>
        <div className="shareCodeLink">
          <label>Link:</label>
          <input
            type="text"
            value={generatedShareLink}
            disabled={true}
            required
          />
          <a className="codeAreaCopyCodeBtn">
            <img
              src={CopyIcon}
              alt="Btn here"
              onClick={() => {
                copyCodeToClipBoard(generatedShareLink);
              }}
            />
            <span className="Tooltip">Copy link</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareCodeDialogue;
