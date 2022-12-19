import { Fragment } from "react";
import DashboardComponent from "../components/dashbordNavbar";

const NotFound = () => {
  return (
    <Fragment>
      <div className="hindCompoent">
        <DashboardComponent />
        <div className="main">
          <h1 className="notFound">Page Not Found</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
