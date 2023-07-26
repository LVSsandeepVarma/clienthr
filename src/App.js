import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyPhone from "./components/verification/verifyPhone";
import VerifyOtp from "./components/verification/verifyOtp";
import Dashboard from "./components/studentDashboard/dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/candidate/verify/:hash" element={<VerifyPhone/>}></Route>
          <Route path="/candidate/otp" element={<VerifyOtp />}></Route>
          <Route path="/candidate/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
