import DashboardComponent from "../components/dashbordNavbar";
import Grid from "@mui/material/Grid";
import FormDialog from "../components/card";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFolders } from "../redux/Slice/fileFolderSlice";
import BasicCard from "../components/folderCard";
import { useNavigate } from "react-router-dom";

export default function PrimarySearchAppBar() {
  const { result } = useSelector((state) => ({ ...state.user.user }));
  const { user } = useSelector((state) => ({ ...state.user }));
  const { userFolder } = useSelector((state) => ({ ...state.fileFolders }));
  const userProfile = localStorage.getItem("profile");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (result?._id) {
      const token = user.token;
      dispatch(getFolders(token));
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
        {userFolder
          .filter((folder) => folder.path === "root")
          .map((folder) => (
            <Grid item key={folder?._id}>
              <BasicCard
                type="folder"
                folderID={folder?._id}
                title={folder?.name}
                sx={{ width: 200, height: 135, ml: 3, mt: 3 }}
              />
            </Grid>
          ))}
      </Grid>
      <FormDialog />
    </>
  );
}
