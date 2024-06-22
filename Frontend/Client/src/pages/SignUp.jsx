import { Link } from "react-router-dom";
import { useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    setError("");
    
    // Basic client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true); // Start loading

    try {
      console.log('Sending request to the server...');
      const res = await axios.post(`http://localhost:5000/auth/signup`, formData);
      console.log('Server response:', res.data.message);
      alert("User Created Successfully");
      setLoading(false); // Stop loading
      // Reset form data after successful submission
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log('Error occurred');
      setLoading(false); // Stop loading
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
        setError(err.response.data.message || "An error occurred");
      } else if (err.request) {
        console.error('Request data:', err.request);
        setError("No response from server. Please try again later.");
      } else {
        console.error('Error message:', err.message);
        setError("An error occurred. Please try again.");
      }
      console.error('Config data:', err.config);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <p className="text-center">Sign up to get started.</p>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} type="text" placeholder="Username" id="username" value={formData.username} />
        <input className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} type="email" placeholder="Email" id="email" value={formData.email} />
        <input className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} type="password" placeholder="Password" id="password" value={formData.password} />
        <button className="bg-[#23034e] hover:bg-[#341d52] text-white font-bold py-2 px-4 rounded-lg uppercase disabled:bg-[#cbd5e1] flex justify-center items-center" type="submit" disabled={loading}>
          {loading ? <ClipLoader color="#fff" size={24} /> : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 my-3">
        <p>Have an account?</p>
        <Link to='/sign-in'><span className="text-[#23034e] font-bold">Sign in</span></Link>
      </div>
    </div>
  );
};

export default SignUp;
