import DashboardComponent from "../components/dashbordNavbar";
import Grid from "@mui/material/Grid";
import FormDialog from "../components/card";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BasicCard from "../components/folderCard";
import { useNavigate } from "react-router-dom";
import SkeletonCompenent from "../components/Skeleton";
import FileCard from "../components/fileCard";
import { Typography } from "@mui/material";

export default function PrimarySearchAppBar() {
  const { userFolder } = useSelector((state) => ({ ...state.fileFolders }));
  const { userFiles } = useSelector((state) => ({ ...state.fileFolders }));
  const { isLoading } = useSelector((state) => ({ ...state.fileFolders }));
  const userProfile = localStorage.getItem("profile");

  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <DashboardComponent />
      <Grid
        container
        direction="row"
        justify="center"
        // style={{ minHeight: "100vh" }}
      >
        {userFolder?.length === 0 && userFiles?.length === 0 && (
          <Grid container direction="column" alignItems="center">
            <Typography>No data</Typography>
          </Grid>
        )}

        {isLoading ? (
          <SkeletonCompenent card={9} />
        ) : (
          userFolder
            ?.filter((folder) => folder.path === "root")
            ?.map((folder) => (
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
        )}

        {isLoading ? (
          <SkeletonCompenent card={9} />
        ) : (
          userFiles
            ?.filter((files) => files.path === "root")
            ?.map((files) => (
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
        )}
      </Grid>
      <FormDialog />
    </>
  );
}
