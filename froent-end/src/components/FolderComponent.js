import { Fragment } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormDialog from "./card";
import DashboardComponent from "./dashbordNavbar";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/folderCard";

const FolderComponent = () => {
  const { folderId } = useParams();
  const { childFolders } = useSelector(
    (state) => ({
      childFolders: state.fileFolders.userFolder.filter(
        (folder) => folder.path === folderId
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
      <FormDialog />
    </Fragment>
  );
};

export default FolderComponent;
