import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import TextInput from "../TextInput";
import CustomButton from "../CustomButton";

const RegisterForm = ({ toggleForm }) => {
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
    // Append time to the date for the birthday field
    data.birthday = `${data.birthday} 00:00:00`;

    try {
      const response = await axios.post("http://localhost:8000/api/seeker/register", data);

      console.log('response : ', response)
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
          pattern: {
            value: /^(?:[a-z]|[0-9]){8,12}$/,
            message: "Username must be lowercase or numbers, 8-12 characters long",
          },
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
            pattern: {
              value: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,16}$/,
              message: "Password must be 6-16 characters long and include letters, numbers, and special characters",
            },
          })}
          error={errors.password ? errors.password.message : ""}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 mt-7 px-3 py-2 text-gray-500"
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

      <TextInput
        name="email"
        label="Email Address"
        placeholder="email@example.com"
        type="email"
        register={register("email", {
          required: "Email Address is required!",
        })}
        error={errors.email ? errors.email.message : ""}
      />

      <TextInput
        name="phone"
        label="Phone Number"
        placeholder="+12345678901"
        type="tel"
        register={register("phone", {
          required: "Phone number is required!",
          pattern: {
            value: /^[\+][0-9]{11,14}$/,
            message: "Phone number must be in the format +12345678901 and 11-14 digits long",
          },
        })}
        error={errors.phone ? errors.phone.message : ""}
      />

      <TextInput
        name="name"
        label="Full Name"
        placeholder="Full Name"
        type="text"
        register={register("name", {
          required: "Full name is required!",
        })}
        error={errors.name ? errors.name.message : ""}
      />

      <div className="flex flex-col gap-1">
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          {...register("gender")}
        >
          <option value="">Prefer not to say</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Other</option>
        </select>
      </div>

      <TextInput
        name="birthday"
        label="Birthday"
        placeholder="YYYY-MM-DD"
        type="date"
        register={register("birthday", {
          required: "Birthday is required!",
          pattern: {
            value: /^\d{4}-\d{2}-\d{2}$/,
            message: "Invalid date format",
          },
        })}
        error={errors.birthday ? errors.birthday.message : ""}
      />

      {errMsg && (
        <span role="alert" className="text-sm text-red-500 mt-0.5">
          {errMsg}
        </span>
      )}

      <CustomButton
        type="submit"
        containerStyles="mt-4 inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800"
        title="Create Account"
      />

      <div className="mt-4 text-sm text-gray-700 fixed bottom-0">
        Already have an account?{" "}
        <span
          className="text-blue-600 hover:text-blue-700 hover:font-semibold cursor-pointer"
          onClick={toggleForm}
        >
          Login
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;