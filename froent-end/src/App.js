import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/landingPages/signup";
import { SignIn } from "./pages/landingPages/login";
// import Header from "./components/layout/Header";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
