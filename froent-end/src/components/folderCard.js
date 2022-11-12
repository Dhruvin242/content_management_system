import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import ResponsiveDialog from "./resposeDialog";
import FolderIcon from "@mui/icons-material/Folder";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCurrentFolder } from "../redux/Slice/fileFolderSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";

import FolderOptions from "./folderOptions";

export default function BasicCard(props) {
  const [folderOptions, setFolderOption] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [Respose, setResponse] = React.useState(false);
  const handledelete = () => {
    setResponse(true);
  };

  React.useEffect(() => {
    if (pathname === "/dashboard") {
      dispatch(setCurrentFolder("root"));
    }
  }, [pathname]);

  const handleshare = () => {};

  const handleFolderOption = () => {
    setFolderOption(true);
  };

  const handleFolderOpen = (folder) => {
    dispatch(setCurrentFolder(folder));
    navigate(`/dashboard/folder/${folder}`);
  };

  return (
    <React.Fragment>
      <Card sx={props.sx}>
        {Respose && (
          <ResponsiveDialog
            setResponse={setResponse}
            folderName={props.title}
            folderId={props.folderID}
          />
        )}
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography>
            {props.type === "folder" && (
              <IconButton
                aria-label="share"
                size="small"
                onClick={() => handleFolderOpen(props.folderID)}
              >
                <FolderIcon fontSize="large" />
              </IconButton>
            )}
          </Typography>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            {props.title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="delete" onClick={handledelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={handleshare}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
