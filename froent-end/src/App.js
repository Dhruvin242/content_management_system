import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/Login";
import { SignUp } from "./pages/Register";
import Home from "./pages/Home";
import Logout from "./pages/logout";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
