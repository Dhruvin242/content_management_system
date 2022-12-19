import * as React from "react";
import { createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { hideDocument, setCurrentFolder, UnhideDocument } from "../redux/Slice/fileFolderSlice";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ListItemIcon from "@mui/material/ListItemIcon";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import FilePreview from "./FilePreview";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import PDFPreview from "./pdfPreview";
import DownloadIcon from "@mui/icons-material/Download";
import ShareDialog from "./shareDialog";
import ResponsiveDialog from "./resposeDialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import { ThemeProvider } from "@emotion/react";
import { Avatar, AvatarGroup } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function FileCard(props) {
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [Respose, setResponse] = React.useState(false);
  const [ImagePreview, setImagePreview] = React.useState(false);
  const [PSDPreview, setPDFPreview] = React.useState(false);
  const [shareRes, setShareRes] = React.useState(false);

  React.useEffect(() => {
    if (pathname === "/dashboard") {
      dispatch(setCurrentFolder("root"));
    }
  }, [pathname]);
  const { user, userFiles } = useSelector(
    (state) => ({
      user: state.user.user,
      userFiles: state.fileFolders?.userFiles,
    }),
    shallowEqual
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFileEdit = async (e) => {
    navigate(`/file/${e}`);
  };

  const handlePdfPreview = () => {
    setPDFPreview(true);
  };

  const handleImagePreviewOpen = () => {
    setImagePreview(true);
  };

  const handledelete = () => {
    setResponse(true);
  };

  const handleshare = () => {
    setShareRes(true);
  };
  const handlehide = (isHide) => {
    const body = {
      folder: props.fileID,
    };
    const token = user.token;
    console.log(isHide);
    !isHide ? dispatch(hideDocument({ body, token })) : dispatch(UnhideDocument({ body, token }));
    
  };


  const downloadURL = `https://res.cloudinary.com/dh2o42cij/image/upload/fl_attachment:${
    props.title.split(".")[0]
  }/Files/${props.title.split(".")[0]}`;

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        {Respose && (
          <ResponsiveDialog
            setResponse={setResponse}
            folderName={props.title}
            folderId={props.fileID}
          />
        )}
        {shareRes && (
          <ShareDialog setShareRes={setShareRes} fileName={props.title} />
        )}
        <Card sx={{ minHeight: 175 }}>
          <div className="cardWrapper">
            <CardHeader
              title={
                <div>
                  <Typography variant="body2" color="text.secondary">
                    {props.type.startsWith("image") && (
                      <IconButton
                        aria-label="share"
                        size="small"
                        color="secondary"
                        onClick={() => handleImagePreviewOpen(props.imageURL)}
                      >
                        <ImageIcon sx={{ fontSize: 40 }} />
                      </IconButton>
                    )}
                    {ImagePreview && (
                      <FilePreview
                        documentName={props.title}
                        imageURL={props.imageURL}
                        setImagePreview={setImagePreview}
                      />
                    )}
                    {props.type === "application/pdf" && (
                      <IconButton
                        aria-label="share"
                        size="small"
                        color="secondary"
                        onClick={() => handlePdfPreview(props.imageURL)}
                      >
                        <PictureAsPdfIcon sx={{ fontSize: 40 }} />
                      </IconButton>
                    )}
                    {PSDPreview && (
                      <PDFPreview
                        documentName={props.title}
                        imageURL={props.imageURL}
                        setPDFPreview={setPDFPreview}
                      />
                    )}

                    {props.type === "text/plain" && (
                      <InsertDriveFileIcon
                        color="secondary"
                        sx={{ fontSize: 40 }}
                      />
                    )}

                    {props.type === "application/zip" && (
                      <IconButton
                        aria-label="share"
                        size="small"
                        color="secondary"
                      >
                        <FolderZipIcon sx={{ fontSize: 40 }} />
                      </IconButton>
                    )}
                  </Typography>
                  <Typography
                    sx={{ textTransform: "capitalize" }}
                    variant="subtitle2"
                    color="black"
                    component="span"
                  >
                    {props.title}
                  </Typography>
                </div>
              }
            />

            <CardActions disableSpacing>
              <IconButton href={downloadURL}>
                <DownloadIcon sx={{ ml: "14px" }} />
              </IconButton>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MoreVertIcon sx={{ mt: "10px" }} />
              </IconButton>
            </CardActions>
          </div>
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
            <MenuItem onClick={handleshare}>
              <ListItemIcon>
                <ShareIcon fontSize="small" />
              </ListItemIcon>
              Share
            </MenuItem>
            <MenuItem onClick={() => handleFileEdit(props.fileID)}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>
            <MenuItem onClick={handledelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
            <MenuItem onClick={() => handlehide(props.isHide)}>
              <ListItemIcon>
                {!props.isHide ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </ListItemIcon>
              {!props.isHide ? "Hide" : "Un-Hide"}
            </MenuItem>
          </Menu>
          {props?.SharedWith?.length > 0 && (
            <div className="card-footer">
              <AvatarGroup max={3}>
                {props?.SharedWith?.length > 0 &&
                  props.SharedWith.map((name) => (
                    <Avatar
                      alt={name}
                      key={name}
                      src="/static/images/avatar/1.jpg"
                    />
                  ))}
              </AvatarGroup>
            </div>
          )}
        </Card>
      </React.Fragment>
    </ThemeProvider>
  );
}
