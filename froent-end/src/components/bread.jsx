import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <>
      <div className="grid-switch-wraper">
        <label className="switch">
          {/* <input type="checkbox" /> */}
          {/* <span className="slider round"></span> */}
        </label>
      </div>
      <Breadcrumbs  aria-label="breadcrumb">
        {pathnames.length > 0 ? (
          <Link sx={{color: "#ff8100" , textDecorationLine:"none"}} onClick={() => navigate("/")}>Home</Link>
        ) : (
          <Typography> Home </Typography>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name}>{name}</Typography>
          ) : (
            <Link sx={{color : 'black', textDecorationLine:"none"  }} key={name} onClick={() => navigate(routeTo)}>
              {name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </>
  );
};

export default Breadcrumb;
