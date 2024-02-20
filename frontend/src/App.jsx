import { useState } from "react";
import "./App.css";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
