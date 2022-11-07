import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/Login";
import { SignUp } from "./pages/Register";
import Home from "./pages/Home";
import { ResetPassword } from "./pages/forgot-password";
import { ResetPasswordChange } from "./pages/reset-passwordChange";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/change-password/:token" element={<ResetPasswordChange />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
