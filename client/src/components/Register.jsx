import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // You get response data directly:
      console.log(res);
      console.log("Response:", res.data);
      if(res.status === 201){
        alert("Registered successfully!");
        navigate('/');
      }

    } catch (error) {
      // If backend sends an error (like email already exists)
      const msg = error.response?.data?.message || "Registration failed";
      alert(msg);
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white w-[90%] sm:w-[400px] p-6 sm:p-8 rounded-xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-6 p-2 rounded"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
