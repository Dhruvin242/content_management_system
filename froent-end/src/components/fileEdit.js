import { Fragment, useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { shareFileEdit } from "../redux/Slice/shareSlice";
import DisplayAlert from "./alert";
import JoditEditor from "jodit-react";

const FileEdit = () => {
  const { fileId } = useParams();

  const { file, user, error, message } = useSelector(
    (state) => ({
      file: state.fileFolders.userFiles,
      user: state.user.user,
      error: state.fileFolders.error,
      message: state.fileFolders.message,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [pre, setPre] = useState("");

  const getFile = () => {
    const editFile = file.filter((e) => e._id === fileId);
    return editFile;
  };

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
    const body = {
      newdata: content,
    };
    const token = user.token;
    console.log(content);
    dispatch(shareFileEdit({ body, token, fileId }));
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
      <div className="heading">
        <h1>File Edit here</h1>
      </div>

      {/* <TextareaAutosize
        id="updatedContent"
        aria-label="minimum height"
        minRows={10}
        style={{
          width: 800,
          textAlign: "left",
        }}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      /> */}
      <div className="editor">
        <JoditEditor
          value={content}
          tabIndex={1} // tabIndex of textarea
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />

        <Grid alignItems="center">
          
          <Button
            sx={{mt : 5, px: 10 }}
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
