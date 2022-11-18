import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { hideDocument, setCurrentFolder } from "../redux/Slice/fileFolderSlice";
import MenuList from "@mui/material/MenuList";
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

export default function FileCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [expanded, setExpanded] = React.useState(false);
  const [Respose, setResponse] = React.useState(false);
  const [ImagePreview, setImagePreview] = React.useState(false);
  const [PSDPreview, setPDFPreview] = React.useState(false);
  const [shareRes, setShareRes] = React.useState(false);

  React.useEffect(() => {
    if (pathname === "/dashboard") {
      dispatch(setCurrentFolder("root"));
    }
  }, [pathname]);
  const { user } = useSelector(
    (state) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFileOpen = (file) => {
    dispatch(setCurrentFolder(file));
    navigate(`/dashboard/folder/${file}`);
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
  const handlehide = () => {
    const body = {
      folder: props.fileID,
    };
    const token = user.token;
    dispatch(hideDocument({ body, token }));
  };

  const downloadURL = `https://res.cloudinary.com/dh2o42cij/${
    props.imageURL.split("/")[4]
  }/upload/fl_attachment:${props.title.split(".")[0]}/Files/${
    props.imageURL.split("/")[8]
  }`;

  return (
    <React.Fragment>
      {shareRes && (
        <ShareDialog
          setShareRes={setShareRes}
          fileName={props.title}
        />
      )}
      <Card sx={props.sx}>
        <CardHeader
          title={props.title}
          subheader={props.filecreatedAt.substr(
            0,
            props.filecreatedAt.search("T")
          )}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.type === "image/jpeg" && (
              <IconButton
                aria-label="share"
                size="small"
                onClick={() => handleImagePreviewOpen(props.imageURL)}
              >
                <ImageIcon sx={{ fontSize: 45 }} />
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
                onClick={() => handlePdfPreview(props.imageURL)}
              >
                <PictureAsPdfIcon sx={{ fontSize: 45 }} />
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
              <IconButton
                aria-label="share"
                size="small"
                onClick={() => handleFileOpen(props.fileID)}
              >
                <EditIcon sx={{ fontSize: 45 }} />
              </IconButton>
            )}
            {props.type === "application/zip" && (
              <IconButton aria-label="share" size="small">
                <FolderZipIcon sx={{ fontSize: 45 }} />
              </IconButton>
            )}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton href={downloadURL}>
            <DownloadIcon />
          </IconButton>
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
    </React.Fragment>
  );
}
