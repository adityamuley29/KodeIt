import React, { useState } from "react";
import ShareCodeImage from "../assets/icons/share-from-square-regular.svg";
import { useNavigate } from "react-router-dom";

const ShareCode = () => {
  const history = useNavigate();

  return (
    <a
      className="shareCodeImage"
      onClick={() => {
        history("/generate-share-link");
      }}
    >
      <img src={ShareCodeImage} />
      <span className="Tooltip">Share Code</span>
    </a>
  );
};

export default ShareCode;
