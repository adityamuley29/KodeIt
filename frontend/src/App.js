import { useState } from "react";
import "./App.css";
import CodeArea from "./codeArea";
import TopNavbar from "./components/TopNavbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterUser from "./components/registerUser";
import SigninUser from "./components/signinUser";

function App() {
  const [language, setLanguage] = useState("py");

  return (
    <Router>
      <div className="App">
        <div className="appHeader">
          <TopNavbar />
          <h1 className="projectTitle">
            <span id="brandName">KodeIt</span>
            <span id="brandSubName">Online Code Compiler</span>
          </h1>

          <div className="selectLanguage">
            <label>Language :</label>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="py">Python</option>
            </select>
          </div>
        </div>

        <CodeArea language={language} />
        <Routes>
          <Route path="/user/register" element={<RegisterUser />} />
          <Route path="/user/signin" element={<SigninUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
