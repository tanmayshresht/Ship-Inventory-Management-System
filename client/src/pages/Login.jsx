import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
     e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login Successful!");
    navigate("/dashboard");
  }
  catch (error) {
    alert(
      error.response?.data?.message || "Login Failed"
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
          Login to continue
        </p>

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
          onClick={handleLogin}
          className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-900 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;