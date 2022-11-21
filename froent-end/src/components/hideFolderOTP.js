import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { hideFolder } from "../redux/Slice/fileFolderSlice";
import { useForm } from "react-hook-form";

export default function HideOTP(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => ({
      user: state.user.user,
    }),
    shallowEqual
  );
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.sethideOTP(false);
  };

  const handleSubmitForm = (data) => {
    props.sethideOTP(false);
    const token = user.token;
    dispatch(hideFolder({data, token}));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ maxWidth: "xs" }}>
        <DialogTitle>Enter Passcode</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="passcode"
            type="password"
            label="passcode"
            fullWidth
            variant="standard"
            {...register("passcode", {
              required: "Required Field",
            })}
            error={!!errors?.passcode}
            helperText={errors?.passcode ? errors.passcode.message : null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(handleSubmitForm)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
