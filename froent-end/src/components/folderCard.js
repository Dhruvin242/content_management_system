import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import ResponsiveDialog from "./resposeDialog";
import FolderIcon from "@mui/icons-material/Folder";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCurrentFolder } from "../redux/Slice/fileFolderSlice";

export default function BasicCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { currentFolder } = useSelector(
    (state) => ({
      currentFolder: state.fileFolders.currentFolder,
    }),
    shallowEqual
  );
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
        <IconButton aria-label="share" size="small" onClick={handleshare}>
          <ShareIcon sx={{ mx: 1 }} />
        </IconButton>
        <IconButton aria-label="share" size="small" onClick={handledelete}>
          <DeleteIcon sx={{ mx: 1 }} />
        </IconButton>
      </Card>
    </React.Fragment>
  );
}
