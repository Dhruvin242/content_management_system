import * as React from "react";
import { styled } from "@mui/material/styles";
import ResponsiveDialog from "./resposeDialog";
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
import { renameFolder, setCurrentFolder } from "../redux/Slice/fileFolderSlice";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ListItemIcon from "@mui/material/ListItemIcon";
import { TextField } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import FilePreview from "./FilePreview";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import PDFPreview from "./pdfPreview";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "@mui/material/Link";

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
  const [Editable, setEditable] = React.useState(false);
  const [ImagePreview, setImagePreview] = React.useState(false);
  const [PSDPreview, setPDFPreview] = React.useState(false);

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

  const handlerename = () => {
    console.log("Rename");
    setEditable(true);
  };

  const handleshare = () => {
    console.log("Share");
  };
  const handlehide = () => {
    console.log("Hide");
  };

  const RenameHandle = (e) => {
    if (e.key === "Enter") {
      const token = user.token;
      const body = {
        folderID: props.folderID,
        name: e.target.value,
      };
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
          fileID={props.fileID}
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
        {/* <a href={props.imageURL}>
          Download watch google
          <a href="https://res.cloudinary.com/demo/image/upload/fl_attachment/sample.jpg">Download</a>

https://res.cloudinary.com/dh2o42cij/image/upload/v1668598424/Files/s7esfu5lm9cy1ypn8h6f.jpg
        </a> */}

        <DownloadIcon />

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
