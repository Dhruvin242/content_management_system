import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { margin } from "@mui/system";
import { DialogTitle } from "@mui/material";

export default function FilePreview(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.setImagePreview(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{props.documentName}</DialogTitle>
      <DialogContent>
        <img
          style={{
            display: "block",
            margin: "auto",
            height: "500px",
            width: "500px",
          }}
          src={props.imageURL}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
