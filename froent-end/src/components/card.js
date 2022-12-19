import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addFolder, uploadFile } from "../redux/Slice/fileFolderSlice";
import DisplayAlert from "../components/alert";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ChipInput from "material-ui-chip-input";
import CircularIndeterminate from "./fileUploadProcess";

export default function FormDialog() {
  const { error } = useSelector((state) => ({ ...state.fileFolders }));
  const { message } = useSelector((state) => ({ ...state.fileFolders }));
  const { isLoading } = useSelector((state) => ({ ...state.fileFolders }));
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [Fileopen, setFileOpen] = React.useState(false);
  const [foldername, setFoldername] = React.useState("");
  const [yourChips, setyourChips] = React.useState(["image"]);
  const [previewSource, setPriviewSource] = React.useState();
  const [file, setFile] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickFileOpen = () => {
    setFileOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFileOpen(false);
  };

  const handleFoldername = (e) => {
    setFoldername(e.target.value);
  };

  const { user, currentFolder } = useSelector(
    (state) => ({
      user: state.user.user,
      currentFolder: state.fileFolders.currentFolder,
    }),
    shallowEqual
  );

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPriviewSource(reader.result);
    };
  };

  const filetypeHandle = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFile(file);
  };

  const handleAddChip = (chipValue) => {
    setyourChips([...yourChips, chipValue]);
  };

  const handleDeleteChip = (e) => {
    setyourChips(yourChips.filter((chip) => chip !== e));
  };

  const uploadFileFunction = (base64EncodedImage) => {
    const data = new FormData();
    data.append("myfile", file);
    data.append("path", currentFolder);
    data.append("tags", yourChips);
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    dispatch(uploadFile({ data, config }));
  };

  const handleFileUpload = (e) => {
    e.preventDefault();

    if (!previewSource) return;
    uploadFileFunction(previewSource);
  };

  const handleCreate = () => {
    if (foldername) {
      const body = {
        name: foldername,
        path: currentFolder,
      };
      const token = user.token;
      setTimeout(() => {
        dispatch(addFolder({ body, token }));
      }, 1200);
    }
    setOpen(false);
  };

  return (
    <div>
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

      <div className="button-circle-wrap">
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 50, right: 20 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            key="Create Folder"
            icon={<FolderOpenIcon sx={{ color: "white" }} />}
            tooltipTitle="Create Folder"
            onClick={handleClickOpen}
          />

          <SpeedDialAction
            key="Upload File"
            icon={<UploadFileIcon sx={{ color: "white" }} />}
            tooltipTitle="Upload File"
            onClick={handleClickFileOpen}
          />
        </SpeedDial>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            value={foldername}
            onChange={handleFoldername}
            label="folder name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>

      {/* File Dialog */}

      <Dialog open={Fileopen} onClose={handleClose}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            type="file"
            name="file"
            onChange={filetypeHandle}
            variant="standard"
          />
          <ChipInput
            label="Enter tags"
            fullWidth
            value={yourChips}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip, index) => handleDeleteChip(chip, index)}
          />
        </DialogContent>
        {previewSource && (
          <img
            src={previewSource}
            alt="no preview"
            style={{
              marginLeft: "30px",
              height: "80px",
              width: "80px",
            }}
          />
        )}
        <DialogActions>
          {isLoading && <CircularIndeterminate />}
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFileUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
