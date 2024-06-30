import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  selectUserLoading,
  selectUserError,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth";
import { useAppSelector, useAppDispatch } from "../hooks/redux.hooks";

const Login = () => {
  let text = "Don't have an account?";
  const [formData, setFormData] = useState({
    identifier: "", // email or username
    password: "",
  });

  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);
  console.log(error)
  console.log(loading)

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    // Basic client-side validation
    if (!formData.identifier || !formData.password) {
      dispatch(
        signInFailure({
          message: "Username or email and password are required",
        })
      );
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/auth/signin`,
        formData
      );
      dispatch(signInSuccess(res.data.user));
      alert("Login Successful");
      navigate("/");
    } catch (err) {
      let errorMessage = "An error occurred. Please try again.";
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Wrong credentials. Please try again.";
        } else {
          errorMessage = err.response.data.message || "An error occurred";
        }
      } else if (err.request) {
        errorMessage = "No response from server. Please try again later.";
      }
      dispatch(signInFailure({ message: errorMessage }));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <p className="text-center">Sign in to continue.</p>
      {error && <p className="text-red-500 text-center">{error.message}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          type="text"
          placeholder="Username or Email"
          id="identifier"
          value={formData.identifier}
        />
        <input
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
        />
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
