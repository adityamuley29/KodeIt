import { useState } from "react";
import "./App.css";
import CodeArea from "./codeArea";

function App() {
  const [language, setLanguage] = useState("py");

  return (
    <div className="App">
      <h1>KodeIt - Online Compiler</h1>

      <div className="selectLanguage">
        <label>Language: </label>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />

      <CodeArea language={language}/>
    </div>
  );
}

export default App;
