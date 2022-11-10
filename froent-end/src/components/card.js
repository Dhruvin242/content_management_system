import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addFolder } from "../redux/Slice/fileFolderSlice";
import DisplayAlert from "../components/alert";

export default function FormDialog() {
  const { error } = useSelector((state) => ({ ...state.fileFolders }));
  const { message } = useSelector((state) => ({ ...state.fileFolders }));
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [foldername, setFoldername] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFoldername = (e) => {
    setFoldername(e.target.value);
  };

  const { user, currentFolder, userFolder } = useSelector(
    (state) => ({
      user: state.user.user,
      currentFolder: state.fileFolders.currentFolder,
      userFolder: state.fileFolders.userFolders,
    }),
    shallowEqual
  );

  const handleCreate = () => {
    if (foldername) {
      const body = {
        name: foldername,
        path: currentFolder,
      };

      const token = user.token;
      dispatch(addFolder({ body, token }));
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

      <Fab
        color="secondary"
        aria-label="add"
        sx={{
          position: "absolute",
          zIndex: 1,
          bottom: 50,
          right: 20,
          margin: "0 auto",
        }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

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
    </div>
  );
}
