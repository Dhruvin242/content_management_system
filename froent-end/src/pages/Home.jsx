import * as React from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/header";

const Home = () => {
  const user = localStorage.getItem("profile");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate("/dashboard");
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <h1>WelCome To Content Management System</h1>
    </div>
  );
};

export default Home;
