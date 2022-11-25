import { Fragment } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormDialog from "./card";
import DashboardComponent from "./dashbordNavbar";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/folderCard";
import FileCard from "./fileCard";
import { Divider } from "@mui/material";

const FolderComponent = () => {
  const { folderId } = useParams();
  const { childFolders, childFiles } = useSelector(
    (state) => ({
      childFolders: state.fileFolders.userFolder.filter(
        (folder) => folder.path.trim() === folderId.trim()
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
      <div className="folder-heading">
        <h3> Folders</h3>
      </div>
      <div className="card-main-wrapper">
        {childFolders.length > 0 ? (
          childFolders.map((folder) => (
            <div className="card-box" key={folder?._id}>
              <Grid
                sx={{ width: "220px" }}
                container
                display="flex"
                columnGap="20px"
                item
                key={folder?._id}
              >
                <BasicCard
                  type="folder"
                  foldercreatedAt={folder?.createdAt}
                  folderID={folder?._id}
                  title={folder?.name}
                  isHide={folder?.isHide}
                />
              </Grid>
            </div>
          ))
        ) : (
          <p className="text-center my-5"> Empty Folder</p>
        )}
      </div>
      <Divider />
      {/* Checking for files */}
      <div className="folder-heading">
        <h3> Files</h3>
      </div>
      <div className="card-main-wrapper">
        {childFiles.length > 0 ? (
          childFiles.map((files) => (
            <div className="card-box" key={files?._id}>
              <Grid item key={files?._id}>
                <div className="file-card-wrapper">
                  <FileCard
                    type={files?.type}
                    imageURL={files?.url}
                    filecreatedAt={files?.createdAt}
                    fileID={files?._id}
                    title={files?.name}
                    isHide={files?.isHide}
                    SharedWith={files?.SharedWith}
                  />
                </div>
              </Grid>
            </div>
          ))
        ) : (
          <p className="text-center my-5"> </p>
        )}
      </div>
      <FormDialog />
    </Fragment>
  );
};

export default FolderComponent;
