import React from 'react'
import { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

      axios.get(`${import.meta.env.VITE_API_URL}api/auth/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessage(res.data.message))
      .catch((err) => {console.log(err), setMessage("Access Denied")});
  }, [])
  
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">{message}</h1>
      <button onClick={handleLogout} className='border border-black p-2 rounded ms-3 text-2xl'>Logout</button>
    </div>
  )
}

export default Dashboard