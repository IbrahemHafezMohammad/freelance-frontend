import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../redux/userSlice";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const closeModal = () => setOpen(false);

  const onSubmit = async (data) => {
    try {
      const endpoint = isRegister
        ? "/api/seeker/register"
        : "/api/seeker/login";

      const response = await axios.post(endpoint, data);

      console.log('response ', response)
      if (response.data.token) {
        dispatch(login(response.data));
        navigate(location.state?.from?.pathname || "/", { replace: true });
      } else {
        setErrMsg("Invalid credentials");
      }
    } catch (error) {
      setErrMsg("An error occurred. Please try again.");
    }
  };

  return (
    <Transition appear show={open}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {} /* Do nothing on backdrop click */}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-900"
                >
                  {isRegister ? "Create Account" : "Account Sign In"}
                </Dialog.Title>

                <form
                  className="w-full flex flex-col gap-4 mt-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
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

                  <TextInput
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    register={register("password", {
                      required: "Password is required!",
                    })}
                    error={errors.password ? errors.password.message : ""}
                  />

                  {isRegister && (
                    <>
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
                        placeholder="Phone Number"
                        type="tel"
                        register={register("phone", {
                          required: "Phone number is required!",
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
                        <label className="block text-sm font-medium text-gray-700">
                          Gender
                        </label>
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
                        placeholder="YYYY-MM-DD HH:MM:SS"
                        type="datetime-local"
                        register={register("birthday", {
                          required: "Birthday is required!",
                          pattern: {
                            value: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
                            message: "Invalid date format",
                          },
                        })}
                        error={errors.birthday ? errors.birthday.message : ""}
                      />
                    </>
                  )}

                  {errMsg && (
                    <span role="alert" className="text-sm text-red-500 mt-0.5">
                      {errMsg}
                    </span>
                  )}

                  <CustomButton
                    type="submit"
                    containerStyles="mt-4 inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800"
                    title={isRegister ? "Create Account" : "Login Account"}
                  />
                </form>

                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    {isRegister
                      ? "Already have an account?"
                      : "Don't have an account?"}

                    <span
                      className="text-sm text-blue-600 ml-2 hover:text-blue-700 hover:font-semibold cursor-pointer"
                      onClick={() => setIsRegister((prev) => !prev)}
                    >
                      {isRegister ? "Login" : "Create Account"}
                    </span>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SignUp;
