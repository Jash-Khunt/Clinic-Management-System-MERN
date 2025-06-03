import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "lucide-react";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Doctor from "../pages/Doctor";

import Tokens from "../pages/doctor/Tokens";
import Patients from "../pages/receptionist/Patients";
import CTokens from "../pages/receptionist/CTokens";
import Billing from "../pages/receptionist/Billing";
import Visits from "../pages/Visits.jsx";

const Routers = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      {authUser?.role === "doctor" && (
        <>
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/visits" element={<Visits />} />
        </>
      )}
      {authUser?.role === "receptionist" && (
        <>
          <Route path="/patients" element={<Patients />} />
          <Route path="/ctokens" element={<CTokens />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/visits" element={<Visits />} />
        </>
      )}
    </Routes>
  );
};

export default Routers;
