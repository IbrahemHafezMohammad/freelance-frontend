import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import TextInput from "../TextInput";
import CustomButton from "../CustomButton";

const LoginForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/seeker/login", data);

      if (response.data.token) {
        dispatch(login(response.data));
        window.location.replace("/");
      } else {
        setErrMsg("Invalid credentials");
      }
    } catch (error) {
      setErrMsg("An error occurred. Please try again.");
    }
  };

  return (
    <form className="w-full flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="user_name"
        label="Username"
        placeholder="Username"
        type="text"
        register={register("user_name", {
          required: "Username is required!",
        })}
        error={errors.user_name ? errors.user_name.message : ""}
      />

      <div className="relative">
        <TextInput
          name="password"
          label="Password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          register={register("password", {
            required: "Password is required!",
          })}
          error={errors.password ? errors.password.message : ""}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <div className="relative">
        <TextInput
          name="confirm_password"
          label="Confirm Password"
          placeholder="Confirm Password"
          type={showPassword ? "text" : "password"}
          register={register("confirm_password", {
            required: "Confirm Password is required!",
            validate: (value) => {
              const { password } = getValues();
              return password === value || "Passwords do not match";
            },
          })}
          error={errors.confirm_password ? errors.confirm_password.message : ""}
        />
      </div>

      {errMsg && (
        <span role="alert" className="text-sm text-red-500 mt-0.5">
          {errMsg}
        </span>
      )}

      <CustomButton
        type="submit"
        containerStyles="mt-4 inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800"
        title="Login"
      />

      <div className="mt-4 text-sm text-gray-700 fixed bottom-0">
        Don't have an account?{" "}
        <span
          className="text-blue-600 hover:text-blue-700 hover:font-semibold cursor-pointer"
          onClick={toggleForm}
        >
          Create Account
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
