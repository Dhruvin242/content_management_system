import { Fragment } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormDialog from "./card";
import DashboardComponent from "./dashbordNavbar";

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
        <h1>
          <p>{JSON.stringify(childFolders)}</p>
        </h1>
      ) : (
        <p className="text-center my-5"> Empty Folder</p>
      )}
      <FormDialog />
    </Fragment>
  );
};

export default FolderComponent;
