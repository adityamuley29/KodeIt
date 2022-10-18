import React, { useState } from "react";
import axios from "axios";

function CodeArea({ language }) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");

  const handleSubmit = async () => {
    const payload = {
      language: language,
      code,
    };

    try {
      setJobId("");
      setStatus("");
      setOutput("");
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
    <>
      <div className="codeArea">
        <textarea
          rows="20"
          cols="80"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        ></textarea>
        <br />
        <button onClick={handleSubmit}>Run</button>
      </div>
      <div className="outputArea">
        <p>{status}</p>
        <p>{jobId && `JobId: ${jobId}`}</p>

        <p>{output}</p>
      </div>
    </>
  );
}

export default CodeArea;
