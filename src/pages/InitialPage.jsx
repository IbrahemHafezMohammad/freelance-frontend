import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const InitialPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to JobFinder</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your ultimate platform to find your dream job or the perfect candidate for your company.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/user-auth">
          <CustomButton
            title="Sign In"
            containerStyles="text-white bg-blue-600 py-2 px-6 rounded-full text-base hover:bg-blue-700"
          />
        </Link>
        <Link to="/user-auth">
          <CustomButton
            title="Sign Up"
            containerStyles="text-blue-600 border border-blue-600 py-2 px-6 rounded-full text-base hover:bg-blue-700 hover:text-white"
          />
        </Link>
      </div>
    </div>
  );
};

export default InitialPage;
