import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { shareFile } from "../redux/Slice/shareSlice";
import DisplayAlert from "../components/alert";

export default function ShareDialog(props) {
  const dispatch = useDispatch();
  const { data, user,message } = useSelector(
    (state) => ({
      data: state.fileFolders.userFiles,
      user: state.user.user,
      message : state.shareFiles
    }),
    shallowEqual
  );
  const [open, setOpen] = React.useState(true);
  const [userEmail, setUser] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
    props.setShareRes(false);
  };

  const handlechange = (e) => {
    setUser(e.target.value);
  };

  const handleShare = (name) => {
    const newFile = data.filter((file) => {
      return file.name === name;
    });
    const token = user.token;
    const body = {
      name: newFile[0].name,
      type: newFile[0].type,
      receivedUserEmail: userEmail,
      url: newFile[0].url,
      tags: newFile[0].tags,
    };
    dispatch(shareFile({ body, token }));

    setOpen(false);
    props.setShareRes(false);
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
            value={userEmail}
            onChange={handlechange}
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
          <Button onClick={() => handleShare(props.fileName)} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
