import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/Login";
import { SignUp } from "./pages/Register";
import Home from "./pages/Home";
import { ResetPassword } from "./pages/forgot-password";
import { ResetPasswordChange } from "./pages/reset-passwordChange";
import PrimarySearchAppBar from "./pages/Dashbord";
import FolderComponent from "./components/FolderComponent";
import FileEdit from "./components/fileEdit";
import NotFound from "./pages/NotFound";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password/change-password/:token"
            element={<ResetPasswordChange />}
          />
            <Route
              path="/dashboard/folder/:folderId"
              element={<FolderComponent />}
            />
          <Route path="/dashboard/*" element={<PrimarySearchAppBar />} />
          <Route path="/file/:fileId" element={<FileEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
