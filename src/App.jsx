import { Outlet, Navigate, Router, Route, Routes, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Footer, Navbar } from "./components";
import {
  About,
  Auth,
  Companies,
  CompanyProfile,
  FindJobs,
  JobDetail,
  UploadJob,
  UserProfile,
  InitialPage
} from "./pages";
import { useSelector } from "react-redux";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/user-auth' state={{ from: location }} replace />
  );
}

function App() {

  const [authFormOpen, setAuthFormOpen] = useState(false);
  const [authFormType, setAuthFormType] = useState("login");

  const { user } = useSelector((state) => state.user);
  return (
    <main className='bg-[#f7fdfd]'>
      <Navbar setAuthFormOpen={setAuthFormOpen} setAuthFormType={setAuthFormType} />

      <Routes>
        {/* <Route element={<Layout />}> */}
        <Route path="/" element={<InitialPage />} />
        <Route path='/find-jobs' element={<FindJobs />} />
        <Route path='/companies' element={<Companies />} />
        <Route path={"/company-profile"} element={<CompanyProfile />} />
        <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
        <Route path={"/upload-job"} element={<UploadJob />} />
        <Route path={"/job-detail/:id"} element={<JobDetail />} />
        <Route path='/about-us' element={<About />} />
        {authFormOpen && (
          <Route
            path="/user-auth"
            element={
              <Auth
                formType={authFormType}
                setFormType={setAuthFormType}
                setAuthFormOpen={setAuthFormOpen}
              />
            }
          />
        )}
      </Routes>

      {user && <Footer />}
    </main>
  );
}

export default App;
