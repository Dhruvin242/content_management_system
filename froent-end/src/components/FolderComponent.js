import { Fragment } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormDialog from "./card";
import DashboardComponent from "./dashbordNavbar";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/folderCard";
import FileCard from "./fileCard";


const FolderComponent = () => {
  const { folderId } = useParams();
  const { childFolders, childFiles } = useSelector(
    (state) => ({
      childFolders: state.fileFolders.userFolder.filter(
        (folder) => folder.path === folderId
      ),
      childFiles: state.fileFolders.userFiles.filter(
        (file) => file.path === folderId
      ),
    }),
    shallowEqual
  );

  return (
    <Fragment>
      <DashboardComponent />
      {childFolders.length > 0 ? (
        childFolders.map((folder) => (
          <Grid item key={folder?._id}>
            <BasicCard
              type="folder"
              foldercreatedAt={folder?.createdAt}
              folderID={folder?._id}
              title={folder?.name}
              isHide={folder?.isHide}
              sx={{ width: 220, ml: 3, mt: 3 }}
            />
          </Grid>
        ))
      ) : (
        <p className="text-center my-5"> Empty Folder</p>
      )}

      {/* Checking for files */}

      {childFiles.length > 0 ? (
        childFiles.map((files) => (
          <Grid item key={files?._id}>
            <FileCard
              type={files?.type}
              imageURL={files?.url}
              filecreatedAt={files?.createdAt}
              fileID={files?._id}
              title={files?.name}
              isHide={files?.isHide}
              sx={{ width: 220, ml: 3, mt: 3 }}
            />
          </Grid>
        ))
      ) : (
        <p className="text-center my-5">  </p>
      )}
      <FormDialog />
    </Fragment>
  );
};

export default FolderComponent;
