import * as React from "react";
import { createTheme } from "@mui/material/styles";
import ResponsiveDialog from "./resposeDialog";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FolderIcon from "@mui/icons-material/Folder";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  hideDocument,
  renameFolder,
  setCurrentFolder,
} from "../redux/Slice/fileFolderSlice";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ListItemIcon from "@mui/material/ListItemIcon";
import { capitalize, TextField } from "@mui/material";
import Menu from "@mui/material/Menu";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import "./style.css";
import { ThemeProvider } from "@emotion/react";

export default function BasicCard(props) {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#ff8100",
      },
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [Respose, setResponse] = React.useState(false);
  const [Editable, setEditable] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    <ThemeProvider theme={theme}>
      <Card className="main-wrapper" sx={{width : 220 , borderRadius : "12px" , minHeight : 215}}>
        {Respose && (
          <ResponsiveDialog
            setResponse={setResponse}
            folderName={props.title}
            folderId={props.folderID}
          />
        )}
        <div className="cardWrapper">
          <CardHeader
            title={
              <IconButton
                aria-label="share"
                size="small"
                onClick={() => handleFolderOpen(props.folderID)}
              >
                <FolderIcon sx={{ fontSize: 35 }} color="secondary" />
              </IconButton>
            }
          />
          <CardActions disableSpacing>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreVertIcon />
            </IconButton>
          </CardActions>
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary" component="span">
            {Editable ? (
              <TextField
                onKeyPress={RenameHandle}
                required
                id="outlined-required"
                label="Required"
                defaultValue={props.title}
              />
            ) : (
              <Typography sx={{textTransform : "capitalize"}} variant="subtitle2" color="black" component="span">
                {props.title}
              </Typography>
            )}
            <br />
            <Typography variant="caption" sx={{color:"gray" , pt:"3"}} color="black" component="span">
            {props.foldercreatedAt.substr(0, props.foldercreatedAt.search("T"))}
              </Typography>
          </Typography>
        </CardContent>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handlerename}>
            <ListItemIcon>
              <DriveFileRenameOutlineIcon fontSize="small" />
            </ListItemIcon>
            Rename
          </MenuItem>
          <MenuItem onClick={handledelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
          <MenuItem onClick={handlehide}>
            <ListItemIcon>
              <VisibilityOffIcon fontSize="small" />
            </ListItemIcon>
            Hide
          </MenuItem>
        </Menu>
        <div className="card-footer">
        <AvatarGroup max={2}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
    </AvatarGroup>
    </div>
      </Card>
    </ThemeProvider>
  );
}
