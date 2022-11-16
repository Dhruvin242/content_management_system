import DashboardComponent from "../components/dashbordNavbar";
import Grid from "@mui/material/Grid";
import FormDialog from "../components/card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFiles, getFolders } from "../redux/Slice/fileFolderSlice";
import BasicCard from "../components/folderCard";
import { useNavigate } from "react-router-dom";
import SkeletonCompenent from "../components/Skeleton";
import FileCard from "../components/fileCard";

export default function PrimarySearchAppBar() {
  const { result } = useSelector((state) => ({ ...state.user.user }));
  const { user } = useSelector((state) => ({ ...state.user }));
  const { userFolder } = useSelector((state) => ({ ...state.fileFolders }));
  const { userFiles } = useSelector((state) => ({ ...state.fileFolders }));
  const { isLoading } = useSelector((state) => ({ ...state.fileFolders }));
  const userProfile = localStorage.getItem("profile");

  const dispatch = useDispatch();
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
