import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Office } from "../assets";
import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";

const Auth = ({ formType, setFormType, setAuthFormOpen }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();

  let from = location?.state?.from?.pathname || "/";

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <img src={Office} alt="Office" className="object-contain mb-4" />
      {formType === "register" ? (
        <RegisterForm toggleForm={() => setFormType("login")} />
      ) : (
        <LoginForm toggleForm={() => setFormType("register")} />
      )}
    </div>
  );
};

export default Auth;
