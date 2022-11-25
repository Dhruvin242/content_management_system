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

const FileEdit = (props) => {
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
      <DashboardComponent />
      <div className="heading">
        <h3 className="file-title">{name} - File Edit here</h3>
      </div>

      <div className="editor">
        <JoditEditor
          value={content}
          tabIndex={1}
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />

        {/* {console.log(pre , content)} */}
        <Grid alignItems="center">
          <Button
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
