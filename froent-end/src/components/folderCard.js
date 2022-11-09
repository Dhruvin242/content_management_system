import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import ResponsiveDialog from "./resposeDialog";
import FolderIcon from "@mui/icons-material/Folder";

export default function BasicCard(props) {
  const [Respose, setResponse] = React.useState(false);
  const handledelete = () => {
    setResponse(true);
  };

  const handleshare = () => {};
  return (
    <React.Fragment>
      <Card sx={props.sx}>
        {Respose && <ResponsiveDialog setResponse={setResponse} />}
        <CardContent>
          <Typography>
            {props.type === "folder" && <FolderIcon fontSize="large" />}
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
