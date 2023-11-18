import React, { useState, useEffect } from "react";
import axios from "axios";
import stubs from "../defaultCodes.js";
import moment from "moment";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import SuccessStatusBtn from "../assets/buttons/successStatusBtn";
import PendingStatusBtn from "../assets/buttons/pendingStatusBtn.js";
import ErrorStatusBtn from "../assets/buttons/errorStatusBtn.js";
import DownloadFile from "./DownloadFile.js";
import SaveCode from "./SaveCode.js";
import CopyCodeToClipBoard from "./CopyCodeToClipBoard.js";
import ShareCode from "./ShareCode.js";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
const { REACT_APP_BACKEND_BASE_URL } = process.env;

function ShareCodeCodeArea() {
  const { addToast } = useToasts();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  const [changeTheme, setChangeTheme] = useState(
    localStorage.getItem("Current Theme")
      ? localStorage.getItem("Current Theme")
      : localStorage.setItem("Current Theme", "monokai")
  );
  const { slug } = useParams();
  const [slugLang, setSlugLang] = useState(
    localStorage.getItem("slug-language")
      ? localStorage.getItem("slug-language")
      : null
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language")
      ? localStorage.getItem("language")
      : localStorage.setItem("language", "cpp")
  );

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("code", JSON.stringify(code));
  }, [code]);

  const renderTimeDetails = () => {
    if (!jobDetails) {
      return "";
    }
    let result = "";
    let { submittedAt, completedAt, startedAt } = jobDetails;

    submittedAt = moment(submittedAt).toString();

    result += `Submited At : ${submittedAt} `;
    if (!completedAt || !startedAt) {
      return result;
    }

    return result;
  };

  const renderExecutionTimeDetails = () => {
    if (!jobDetails) {
      return "";
    }
    let executionTime = "";
    let { completedAt, startedAt } = jobDetails;

    const startTime = moment(startedAt);
    const endTime = moment(completedAt);
    executionTime = endTime.diff(startTime, "seconds", true);

    return executionTime;
  };

  console.log(slugLang);
  const handleSubmit = async () => {
    const payload = {
      language: language,
      code,
    };

    try {
      setJobId("");
      setStatus("");
      setOutput("");
      setJobDetails(null);
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_BASE_URL}/api/run`,
        payload
      );
      setJobId(data.jobId);

      let intervalId;
      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          `${REACT_APP_BACKEND_BASE_URL}/api/status`,
          { params: { id: data.jobId } }
        );

        const { success, job, error } = dataRes;
        // console.log(dataRes);

        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          setStatus(jobStatus);
          setJobDetails(job);
          if (jobStatus === "pending") return;
          setOutput(jobOutput);
          clearInterval(intervalId);
        } else {
          setStatus("Error: Please retry!");
          console.log(error);
          setOutput(error);
          clearInterval(intervalId);
        }

        // console.log(dataRes);
      }, 1000);
    } catch ({ response }) {
      if (response) {
        setOutput(response.data.error);
      } else {
        addToast("Error Connecting to server !", {
          appearance: "error",
          autoDismiss: true,
        });
        setOutput(".");
      }
    }
  };

  useEffect(() => {
    const fetchSlugDetails = async () => {
      console.log(slug);
      try {
        const data = await axios.get(
          `${REACT_APP_BACKEND_BASE_URL}api/share-code/slug-find`,
          { params: { slug: slug } }
        );
        console.log(data);
        if (data.status === 200) {
          setLanguage(data.data.language);
          localStorage.setItem("language", data.data.language);

          setCode(JSON.parse(data.data.code));
          // localStorage.removeItem()
        }
      } catch (error) {
        addToast("Invalid Link !", {
          appearance: "error",
          autoDismiss: true,
        });
        // console.log(error);
      }
    };
    fetchSlugDetails();
  }, []);

  let setMode;
  if (language === "py") {
    setMode = "python";
  } else if (language === "js") {
    setMode = "javascript";
  } else {
    setMode = "c_cpp";
  }

  return (
    <div className="codeArea">
      <div className="inputArea">
        <div className="header-Area" id="header-Area-input">
          <div className="inputFileName">main.{language}</div>
          <div className="header-Area-input-buttons">
            <CopyCodeToClipBoard code={code} />
            <SaveCode language={language} code={code} />
            <DownloadFile language={language} code={code} jobId={jobId} />

            <select
              className="changeTheme"
              placeholder="Change Theme"
              value={changeTheme}
              onChange={(e) => {
                localStorage.setItem("Current Theme", e.target.value);
                setChangeTheme(e.target.value);
              }}
            >
              <option value="monokai">Monokai</option>
              <option value="monokai-light">Monokai Light</option>
              <option value="tomorrow_night">Tomorrow Night</option>
              <option value="github">Github</option>
            </select>
            <button className="runButton" onClick={handleSubmit}>
              Compile & Run
            </button>
          </div>
        </div>
        <AceEditor
          mode={setMode}
          theme={changeTheme}
          className="textarea"
          defaultValue={stubs[language]}
          value={code}
          width="50"
          height="576px"
          fontSize="15px"
          onChange={(e) => {
            setCode(e);
          }}
        ></AceEditor>
        <br />
      </div>
      <div className="outputArea">
        <div className="header-Area" id="header-Area-output">
          <div className="outputTitle">Output </div>
          <div className="header-Area-output-buttons">
            {status !== "" && status === "success" && <SuccessStatusBtn />}
            {status !== "" && status === "pending" && <PendingStatusBtn />}
            {status !== "" && status === "error" && <ErrorStatusBtn />}
            {jobDetails && (status === "success" || status === "error") && (
              <p className="executionTime">
                Execution Time : <span>{renderExecutionTimeDetails()} s</span>
              </p>
            )}
          </div>
        </div>
        <div className="output-content">
          <p className="output-jobId">{jobId && `JobId : ${jobId}`}</p>
          <p className="output-submitedAt">{renderTimeDetails()}</p>
          <p className="output-code">{output}</p>
        </div>
      </div>
    </div>
  );
}

export default ShareCodeCodeArea;
