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
    <div className="home-pages-wrapper">
      <div className="bg-home">
      <ResponsiveAppBar />
      <h2>Welcome To Content Management System</h2>
      </div>
    </div>
  );
};

export default Home;
