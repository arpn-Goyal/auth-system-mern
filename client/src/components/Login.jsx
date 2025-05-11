import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Don't forget to prevent default form behavior
    const { email, password } = formData;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      
      console.log(res);
      console.log(res.data);
      console.log(res.data.token)
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white w-[90%] sm:w-[400px] p-6 sm:p-8 rounded-xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-6 p-2 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
