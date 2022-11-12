import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { Typography } from "@mui/material";

export default function FolderOptions(props) {
  const handleShare = () => {
    console.log("share clicked");
    props.setFolderOption(false);
  };

  const handleRename = () => {
    console.log("Rename clicked");
    props.setFolderOption(false);
  };
  const handleDelete = () => {
    console.log("Delete clicked");
    props.setFolderOption(false);
  };
  const handleHide = () => {
    console.log("Hide clicked");
    props.setFolderOption(false);
  };

  return (
    <Paper sx={{ width: 150 }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon onClick={handleShare}>
            <ShareIcon fontSize="string" />
          </ListItemIcon>
          <Typography align="left" variant="caption">
            Share
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon onClick={handleRename}>
            <DriveFileRenameOutlineIcon fontSize="string" />
          </ListItemIcon>
          <Typography align="left" variant="caption">
            Rename
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon onClick={handleDelete}>
            <DeleteIcon fontSize="string" />
          </ListItemIcon>
          <Typography align="left" variant="caption">
            Delete
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon onClick={handleHide}>
            <VisibilityOffIcon fontSize="string" />
          </ListItemIcon>
          <Typography align="left" variant="caption">
            Hide
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
