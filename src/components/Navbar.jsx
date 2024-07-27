import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import CustomButton from "./CustomButton";

const MenuList = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          <div className="flex items-center space-x-2">
            <img
              src={user.profileUrl}
              alt="user profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{user.firstName ?? user.name}</span>
            <BiChevronDown className="w-5 h-5" />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/${user.accountType ? "user-profile" : "company-profile"}`}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } flex items-center px-4 py-2 text-sm`}
                >
                  <CgProfile className="mr-3 h-5 w-5" />
                  {user.accountType ? "User Profile" : "Company Profile"}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } flex items-center w-full px-4 py-2 text-sm`}
                >
                  <AiOutlineLogout className="mr-3 h-5 w-5" />
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Navbar = ({ setAuthFormOpen, setAuthFormType }) => {
  const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openAuthForm = (type) => {
    setAuthFormType(type);
    setAuthFormOpen(true);
  };

  return (
    <div className="relative bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between p-5">
        <Link to="/" className="text-blue-600 font-bold text-xl">
          Job<span className="text-blue-500">Finder</span>
        </Link>
        <ul className="hidden lg:flex gap-8 text-base">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/companies">Companies</Link>
              </li>
              <li>
                <Link to="/upload-job">Upload Job</Link>
              </li>
            </>
          )}
        </ul>
        <div className="hidden lg:block">
          {!user ? (
            <>
              <button
                onClick={() => openAuthForm("login")}
                className="mr-4"
              >
                <CustomButton
                  title="Sign In"
                  containerStyles="text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
                />
              </button>
              <button
                onClick={() => openAuthForm("register")}
                className="mr-4"
              >
                <CustomButton
                  title="Sign Up"
                  containerStyles="text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
                />
              </button>
            </>
          ) : (
            <MenuList user={user} />
          )}
        </div>
        <button className="lg:hidden" onClick={toggleMenu}>
          {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </nav>
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-start p-5">
            <li className="py-2">
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            {user && (
              <>
                <li className="py-2">
                  <Link to="/about-us" onClick={toggleMenu}>
                    About
                  </Link>
                </li>
                <li className="py-2">
                  <Link to="/companies" onClick={toggleMenu}>
                    Companies
                  </Link>
                </li>
                <li className="py-2">
                  <Link to="/upload-job" onClick={toggleMenu}>
                    Upload Job
                  </Link>
                </li>
              </>
            )}
            <li className="py-2 w-full">
              {!user ? (
                <>
                  <button
                    onClick={() => openAuthForm("login")}
                    className="w-full mb-2"
                  >
                    <CustomButton
                      title="Sign In"
                      containerStyles="w-full text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
                    />
                  </button>
                  <button
                    onClick={() => openAuthForm("register")}
                    className="w-full"
                  >
                    <CustomButton
                      title="Sign Up"
                      containerStyles="w-full text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
                    />
                  </button>
                </>
              ) : (
                <MenuList user={user} />
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
