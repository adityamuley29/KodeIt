import React, { useState, useEffect } from "react";
import axios from "axios";
import stubs from "./defaultCodes.js";
import moment from "moment";

function CodeArea({ language }) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

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

    const startTime = moment(startedAt);
    const endTime = moment(completedAt);
    const executionTime = endTime.diff(startTime, "seconds", true);

    result += `Execution Time : ${executionTime} s`;

    return result;
  };

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
      const { data } = await axios.post("http://localhost:5000/run", payload);
      console.log(output);
      setJobId(data.jobId);

      let intervalId;
      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          "http://localhost:5000/status",
          { params: { id: data.jobId } }
        );

        const { success, job, error } = dataRes;
        console.log(dataRes);

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

        console.log(dataRes);
      }, 1000);
    } catch ({ response }) {
      if (response) {
        setOutput(response.data.error.stderr);
      } else {
        setOutput("Error Connecting to server!!!");
      }
    }
  };

  return (
    <div className="codeArea">
      <div className="inputArea">
        <div className="header-Area" id="header-Area-input">
          <div className="inputFileName">main.{language}</div>
          <div className="header-Area-input-buttons">
            <button className="runButton" onClick={handleSubmit}>
              Run
            </button>
          </div>
        </div>
        <textarea
          rows="30"
          cols="92"
          value={code}
          onChange={(e) => {
            // response is not working
            let response = window.alert(
              "WARNING: Switching the language, will remove your code !"
            );

            if (response) {
              setCode(e.target.value);
            }
          }}
        ></textarea>
        <br />
      </div>
      <div className="outputArea">
        <div className="header-Area" id="header-Area-output">
          <div className="outputTitle">Output</div>
          {/* <div className="header-Area-input-buttons">
            
          </div> */}
        </div>
        <p>{status}</p>
        <p>{jobId && `JobId: ${jobId}`}</p>
        <p>{renderTimeDetails()}</p>
        <p>{output}</p>
      </div>
    </div>
  );
}

export default CodeArea;
