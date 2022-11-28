import { Fragment, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { shareFileEdit } from "../redux/Slice/shareSlice";
import DisplayAlert from "./alert";
import JoditEditor from "jodit-react";
import DashboardComponent from "./dashbordNavbar";

const FileEdit = () => {
  const { fileId } = useParams();

  const { file, user, error, message, userFiles } = useSelector(
    (state) => ({
      file: state.fileFolders.userFiles,
      user: state.user.user,
      error: state.fileFolders.error,
      message: state.fileFolders.message,
      userFiles: state.fileFolders?.userFiles,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (userFiles[0].permission === "read") {
      document.getElementById("saveContent").style.visibility = "hidden";
      const heading = document.getElementById("title");
      heading.textContent = "You do not have permission to edit this file";
    }
  }, []);

  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [pre, setPre] = useState("");

  const getFile = () => {
    const editFile = file.filter((e) => e._id === fileId);
    return editFile;
  };

  const [{ name }] = getFile();

  const FetchText = async () => {
    const editFile = getFile();
    const res = await axios.get(`${editFile[0].url}`);
    setPre(res.data);
    setContent(res.data);
  };

  useEffect(() => {
    FetchText();
  }, [dispatch]);

  const handleSave = () => {
    if (userFiles[0].permission === "edit") {
      const body = {
        newdata: content,
      };
      const token = user.token;
      dispatch(shareFileEdit({ body, token, fileId }));
    }
  };

  return (
    <Fragment>
      {error && (
        <DisplayAlert
          title="error"
          message={error}
          vertical="top"
          horizontal="right"
        ></DisplayAlert>
      )}
      {message && (
        <DisplayAlert
          title="success"
          message={message}
          vertical="top"
          horizontal="right"
        ></DisplayAlert>
      )}
      <DashboardComponent />
      <div className="heading">
        <h3 className="file-title" id="title">
          {name} - File Edit here
        </h3>
      </div>

      <div className="editor">
        <JoditEditor
          value={content}
          tabIndex={1}
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />

        <Grid alignItems="center">
          <Button
            id="saveContent"
            sx={{ mt: 5, px: 10 }}
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            disabled={pre === content}
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </div>
    </Fragment>
  );
};

export default FileEdit;
