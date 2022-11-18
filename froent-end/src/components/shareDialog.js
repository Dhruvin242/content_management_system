import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { deleteFolder } from "../redux/Slice/fileFolderSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";

export default function ShareDialog(props) {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
    props.setShareRes(false);
  };

  const handleDelete = () => {
    setOpen(false);
    props.setShareRes(false);

    const body = {
      folder: props.folderId || props.fileID,
    };
    const token = user.token;
    dispatch(deleteFolder({ body, token }));
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Find Your Friend  `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter emailID</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
