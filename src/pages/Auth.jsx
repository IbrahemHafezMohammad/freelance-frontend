import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Office } from "../assets";
import AuthDialog from "../components/Auth/AuthDialog";

const Auth = () => {
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  let from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (user?.token) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <img src={Office} alt="Office" className="object-contain mb-4" />
      <AuthDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Auth;
