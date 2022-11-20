import { useState } from "react";
import "./App.css";
import CodeArea from "./codeArea";
import TopNavbar from "./components/TopNavbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterUser from "./components/registerUser";
import SigninUser from "./components/signinUser";
import SaveCodeDialogue from "./components/saveCodedialogue";
import UserMyFiles from "./components/UserMyFiles";
import ShareCodeDialogue from "./components/ShareCodeDialogue";
import ShareCodeCodeArea from "./components/ShareCodeCodeArea";
import UserFileCodeArea from "./components/UserFileCodeArea";

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language")
      ? localStorage.getItem("language")
      : localStorage.setItem("language", "cpp")
  );

  return (
    <Router>
      <div className="App">
        <div className="appHeader">
          <TopNavbar />
          <h1 className="projectTitle">
            <span id="brandName">KodeIt</span>
            <span id="brandSubName">Online Code Compiler</span>
          </h1>
          {window.location.pathname === "/" && (
            <div className="selectLanguage">
              <label>Language :</label>
              <select
                value={language}
                onChange={(e) => {
                  localStorage.setItem("language", e.target.value);
                  setLanguage(e.target.value);
                }}
              >
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="py">Python</option>
                {/* <option value="js">Javascript</option> */}
              </select>
            </div>
          )}
        </div>

        <Routes>
          <Route path="/" element={<CodeArea language={language} />} />
          <Route path="/user/register" element={<RegisterUser />} />
          <Route path="/user/signin" element={<SigninUser />} />
          <Route path="/user/my-files" element={<UserMyFiles />} />
          <Route path="/user/file/:id" element={<UserFileCodeArea />} />
          <Route
            path="/save-code"
            element={<SaveCodeDialogue language={language} />}
          />
          <Route
            path="/generate-share-link"
            element={<ShareCodeDialogue language={language} />}
          />
          {/* this route is for share code */}
          <Route path="/:slug" element={<ShareCodeCodeArea />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
