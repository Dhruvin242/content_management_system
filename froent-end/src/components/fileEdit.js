import { Fragment, useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { shareFileEdit } from "../redux/Slice/shareSlice";
import DisplayAlert from "./alert";
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
      <h1>File Edit here</h1>

      <TextareaAutosize
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
      />

      <Grid alignItems="center">
        <Button
          sx={{ m: 3, px: 10 }}
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          disabled={pre === content}
          onClick={handleSave}
        >
          Save
        </Button>
      </Grid>
    </Fragment>
  );
};

export default FileEdit;
