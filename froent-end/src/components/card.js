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

export default function FormDialog() {
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

  const { userFolder, user } = useSelector(
    (state) => ({
      userFolder: state.fileFolders.userFolder,
      user: state.user.user,
    }),
    shallowEqual
  );

  const checkFolderAlreadyExists = (name) => {
    const folderPresent = userFolder.find((folder) => folder.name === name);
    if (folderPresent) {
      return true;
    } else {
      return false;
    }
  };

  const handleCreate = () => {
    if (foldername) {
      if (!checkFolderAlreadyExists(foldername)) {
        const data = {
          createdAt: new Date(),
          name: foldername,
          userId: user.result._id,
          createdBy: user.result.name,
        };
        console.log(data);
        dispatch(addFolder({ data }));
      } else {
        alert("Folder already exists");
      }
    }
    setOpen(false);
  };

  return (
    <div>
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
