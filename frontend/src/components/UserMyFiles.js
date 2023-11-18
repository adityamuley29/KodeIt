import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import closeCircle from "../assets/icons/close-circle-outline.svg";
import moment from "moment";
import EditIcon from "../assets/icons/pen-to-square-solid.svg";
import CopyIcon from "../assets/icons/copy-solid.svg";
import DeleteIcon from "../assets/icons/trash-solid.svg";
import ShareIcon from "../assets/icons/share-nodes-solid.svg";
import { useToasts } from "react-toast-notifications";
const { REACT_APP_BACKEND_BASE_URL } = process.env;

const UserMyFiles = () => {
  const { addToast } = useToasts();
  const history = useNavigate();
  const [fetchedUserFiles, setFetchedUserFiles] = useState([]);
  const [isEditFile, setIsEditFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFilenameId, setNewFilenameId] = useState("");

  // use effect automatically calls when component is rended
  useEffect(() => {
    fetchUserFiles();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const token = user.token;

  const fetchUserFiles = async () => {
    const payload = {
      userId,
    };

    try {
      const response = await axios.post(
        `${REACT_APP_BACKEND_BASE_URL}/api/save-code/find/all`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const allFiles = response.data;
        setFetchedUserFiles(allFiles);
        console.log(allFiles);
      }
    } catch (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
      // console.log(error);
    }
  };

  const deleteUserFile = async (id) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_BACKEND_BASE_URL}/api/save-code/delete/`,
        { params: { id: id }, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        window.alert(response.data.message);
        fetchUserFiles();
      }
    } catch (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
      // console.log(error);
    }
  };

  const editFileName = async (e) => {
    e.preventDefault();
    const payload = {
      newFileName,
    };
    try {
      const response = await axios.put(
        `${REACT_APP_BACKEND_BASE_URL}/api/save-code/edit-file-name`,
        payload,
        {
          params: { id: newFilenameId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        window.alert(response.data.message);
        setIsEditFile(!isEditFile);
        fetchUserFiles();
      }
    } catch (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
      // console.log(error);
    }
  };

  const copyCodeToClipBoard = (code) => {
    const parsedCode = JSON.parse(code);

    navigator.clipboard.writeText(parsedCode);
    addToast("Successfully Code Copied to ClipBoard !", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  const handleOpenUserFile = (file) => {
    history(`/user/file/${file._id}`, { state: file });
  };
  return (
    <div className="userFilesContainer">
      <img
        id="closeRegister"
        src={closeCircle}
        alt="close button"
        onClick={() => {
          history("/");
        }}
      />
      <div className="userFilesMain">
        <h3 className="userFilesMainTitle">My Files</h3>
        <table>
          <tr id="tableHeaderRow">
            <th>File Name</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
          {fetchedUserFiles ? (
            fetchedUserFiles.map((file) => {
              return (
                <tr id={file._id}>
                  <td>
                    <a
                      className="userFileNameLink"
                      onClick={() => {
                        handleOpenUserFile(file);
                      }}
                    >
                      {file.name}.{file.language}
                    </a>
                  </td>
                  <td>
                    {moment(file.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td>
                    <div className="userFileActions">
                      <span className="Action-item">
                        <img
                          src={EditIcon}
                          alt="Btn here"
                          onClick={() => {
                            setIsEditFile(!isEditFile);
                            setNewFilenameId(file._id);
                          }}
                        />
                        <span className="Tooltip">Edit Name</span>
                      </span>
                      <span className="Action-item">
                        <img
                          src={DeleteIcon}
                          alt="Btn here"
                          onClick={() => {
                            deleteUserFile(file._id);
                          }}
                        />
                        <span className="Tooltip">Delete File</span>
                      </span>
                      {/* <span
                        className="Action-item"
                        onClick={() => {
                          addToast("Coming soon ...", {
                            appearance: "info",
                            autoDismiss: true,
                          });
                        }}
                      >
                        <img src={ShareIcon} alt="Btn here" />
                        <span className="Tooltip">Share File</span>
                      </span> */}
                      <span className="Action-item">
                        <img
                          src={CopyIcon}
                          alt="Btn here"
                          onClick={() => {
                            copyCodeToClipBoard(file.inputCode);
                          }}
                        />
                        <span className="Tooltip">Copy Code</span>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <p>No recored found</p>
          )}
        </table>
      </div>
      {isEditFile && (
        <div className="saveCodeContainer">
          <img
            id="closeRegister"
            onClick={() => {
              setIsEditFile(!isEditFile);
            }}
            src={closeCircle}
          />

          <div className="saveCodeMain">
            <h3 className="saveCodeTitle">Edit File Name</h3>
            <form onSubmit={editFileName}>
              <label>Name of File:</label>
              <input
                type="text"
                required
                value={newFileName}
                onChange={(e) => {
                  setNewFileName(e.target.value);
                }}
              />
              <button type="submit">Done</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMyFiles;
