import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://ship-inventory-management-system.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful!");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-sky-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-[400px]">

        <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
          🚢 Ship Inventory
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create Account
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-900 transition"
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;