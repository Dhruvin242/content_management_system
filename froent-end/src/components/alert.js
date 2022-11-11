import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { emptyError } from "../redux/Slice/userSlice";
import { emptyMessages } from "../redux/Slice/fileFolderSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DisplayAlert = (props) => {
  const { error, errorFile, message } = useSelector(
    (state) => ({
      error: state.user.error,
      errorFile: state.fileFolders.error,
      message: state.fileFolders.message,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const { vertical, horizontal } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  setTimeout(() => {
    if (error !== "") dispatch(emptyError());
    if (errorFile !== "" || message !== "") dispatch(emptyMessages());
  }, 1000);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity={props.title}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default DisplayAlert;
