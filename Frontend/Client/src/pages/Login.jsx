import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import OAuth from "../components/OAuth";
import { useAppSelector, useAppDispatch } from "../hooks/redux.hooks";
import {
  clearAuthError,
  login,
  selectAuthError,
  selectAuthLoading,
} from "../redux/auth.slice.js";
import { unwrapResult } from "@reduxjs/toolkit";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Input from "../components/shared/inputs.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthSchema from "../schemas/auth.schema.js";
import Toast from "../components/shared/toast.jsx"; // Import the Toast component

const Login = () => {
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);

  const loginSchema = AuthSchema;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const [isVisible, setIsVisible] = useState(false);
  const [flag, setFlag] = useState(false);

  let text = "Don't have an account?";

  const [toastMessage, setToastMessage] = useState(""); // State for the toast message

  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

    // Clear persisted error on component mount
  useEffect(() => {
    dispatch(clearAuthError());
    setFlag(true);
  }, [dispatch]);

  // Show toast when there is an error
  useEffect(() => {
    if (error && flag) {
      setToastMessage(error);
    }
  }, [error, flag]);

  const handleLogin = async (data) => {
    try {
      const result = await dispatch(login(data));
      const user = unwrapResult(result);
      if (user && user.data.tokens) {
        navigate("/dashboard");
      }
    } catch (error) {
      setToastMessage(error.message);
    }
  };

  const renderFormInputs = () => (
    <>
      {/* Email / Phone Number */}
      <Input
        ref={phoneNumberRef}
        control={control}
        name="email"
        rootContainerStyles={"mt-4"}
        inputContainerStyles="bg-slate-100"
        label="Phone Number / Email"
        placeholder="Enter phone number or email"
        autoComplete="any"
        prependComponent={
          <MdAlternateEmail className="mr-2 fill-gray-700" size={24} />
        }
      />
      {/* Password */}
      <Input
        ref={passwordRef}
        control={control}
        name="password"
        rootContainerStyles={"mt-2"}
        label="Password"
        type={isVisible ? "text" : "password"}
        placeholder="Enter your password"
        inputContainerStyles="bg-slate-100"
        autoComplete="any"
        prependComponent={
          <RiLockPasswordFill size={24} className="mr-2 fill-gray-700" />
        }
        appendComponent={
          <div style={{ justifyContent: "center" }}>
            {isVisible ? (
              <IoMdEyeOff
                size={24}
                className="mx-2 cursor-pointer fill-gray-700"
                onClick={() => setIsVisible(!isVisible)}
              />
            ) : (
              <IoMdEye
                size={24}
                className="mx-2 cursor-pointer fill-gray-700"
                onClick={() => setIsVisible(!isVisible)}
              />
            )}
          </div>
        }
      />
    </>
  );

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <p className="text-center">Sign in to continue.</p>

      {/* Toast component for displaying errors */}
      <Toast
        message={toastMessage}
        className={"flex mt-4"}
        onClose={() => setToastMessage("")}
      />

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleLogin)}
      >
        {renderFormInputs()}
        <button
          className="bg-[#23034e] hover:bg-[#341d52] text-white font-bold py-2 px-4 rounded-lg uppercase disabled:bg-[#cbd5e1] flex justify-center items-center"
          type="submit"
          disabled={loading}
        >
          {loading ? <ClipLoader color="#fff" size={24} /> : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 my-3 justify-center items-center">
        <p>{text}</p>
        <Link to="/sign-up">
          <span className="text-[#23034e] font-bold">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
