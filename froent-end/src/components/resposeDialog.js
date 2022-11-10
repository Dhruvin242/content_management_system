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

export default function ResponsiveDialog(props) {
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
    props.setResponse(false);
  };

  const handleDelete = () => {
    setOpen(false);
    props.setResponse(false);
    console.log(props.folderId);
    const body = {
      folder: props.folderId,
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
          {`Are you sure you want to delete this ${props.folderName} ? `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please remove this carefully after deleting you can not recover
            that.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
