import * as React from "react";
import { styled } from "@mui/material/styles";
import ResponsiveDialog from "./resposeDialog";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import FolderIcon from "@mui/icons-material/Folder";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  hideDocument,
  renameFolder,
  setCurrentFolder,
} from "../redux/Slice/fileFolderSlice";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ListItemIcon from "@mui/material/ListItemIcon";
import { TextField } from "@mui/material";
import ShareDialog from "./shareDialog";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BasicCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [expanded, setExpanded] = React.useState(false);
  const [Respose, setResponse] = React.useState(false);

  const [Editable, setEditable] = React.useState(false);
  const { user } = useSelector(
    (state) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  React.useEffect(() => {
    if (pathname === "/dashboard") {
      dispatch(setCurrentFolder("root"));
    }
  }, [pathname]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFolderOpen = (folder) => {
    dispatch(setCurrentFolder(folder));
    navigate(`/dashboard/folder/${folder}`);
  };

  const handledelete = () => {
    setResponse(true);
  };

  const handlerename = () => {
    setEditable(true);
  };

  const handleshare = () => {};
  const handlehide = () => {
    const body = {
      folder: props.folderID,
    };
    const token = user.token;
    dispatch(hideDocument({ body, token }));
  };

  const RenameHandle = (e) => {
    if (e.key === "Enter") {
      const token = user.token;
      const body = {
        folderID: props.folderID,
        name: e.target.value,
      };
      console.log(e.target.value, token);
      dispatch(renameFolder({ token, body }));
      setEditable(false);
    }
  };

  return (
    <Card sx={props.sx}>
      {Respose && (
        <ResponsiveDialog
          setResponse={setResponse}
          folderName={props.title}
          folderId={props.folderID}
        />
      )}

      <CardHeader
        title={
          Editable ? (
            <TextField
              onKeyPress={RenameHandle}
              required
              id="outlined-required"
              label="Required"
              defaultValue={props.title}
            />
          ) : (
            props.title
          )
        }
        subheader={props.foldercreatedAt.substr(
          0,
          props.foldercreatedAt.search("T")
        )}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.type === "folder" && (
            <IconButton
              aria-label="share"
              size="small"
              onClick={() => handleFolderOpen(props.folderID)}
            >
              <FolderIcon sx={{ fontSize: 45 }} />
            </IconButton>
          )}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <MenuList>
            <MenuItem onClick={handleshare}>
              <ListItemIcon>
                <ShareIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary">
                Share
              </Typography>
            </MenuItem>
            <MenuItem onClick={handlerename}>
              <ListItemIcon>
                <DriveFileRenameOutlineIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary">
                Rename
              </Typography>
            </MenuItem>
            <MenuItem onClick={handledelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary">
                Delete
              </Typography>
            </MenuItem>
            <MenuItem onClick={handlehide}>
              <ListItemIcon>
                <VisibilityOffIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary">
                Hide
              </Typography>
            </MenuItem>
          </MenuList>
        </CardContent>
      </Collapse>
    </Card>
  );
}
