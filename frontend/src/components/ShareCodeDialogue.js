import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import closeCircle from "../assets/icons/close-circle-outline.svg";
import CopyIcon from "../assets/icons/clipboard-outline.svg";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
const { REACT_APP_BACKEND_BASE_URL } = process.env;

const ShareCodeDialogue = () => {
  const { addToast } = useToasts();
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
        `${REACT_APP_BACKEND_BASE_URL}/api/share-code/slug-generate`,
        payload
      );
      setGeneratedShareLink(`${window.location.origin}/${data.link}`);
      console.log(data.link);
    } catch (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
      // console.log(error);
    }
  };

  const copyCodeToClipBoard = (input) => {
    navigator.clipboard.writeText(input);
    addToast("Successfully Link Copied to ClipBoard !", {
      appearance: "success",
      autoDismiss: true,
    });
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
        <span className="generateLinkExpiresContainer">
          * Link expires after 7 days
        </span>
      </div>
    </div>
  );
};

export default ShareCodeDialogue;
