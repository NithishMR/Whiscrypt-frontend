import { useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setName, setToken } from "../Redux/userSlice";
export default function UserSignIn() {
  const [email, setEmail] = useState(""); // username or email
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    await toast.promise(
      axios.post("http://localhost:5000/api/auth/login", {
        email,
        username,
        password,
      }),
      {
        loading: "Authenticating...",
        success: (res) => {
          // store JWT here if needed
          const token = res.data.token;

          dispatch(setToken(token));
          dispatch(setName(username));
          localStorage.setItem("user_token", token);
          setTimeout(() => navigate("/user/report"), 500);
          return "Login successful!";
        },
        error: "Invalid credentials. Please try again.",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster richColors position="top-center" />

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <p className="text-center text-sm text-gray-500 mb-2">
          Anonymous Access
        </p>
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign in to continue
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              username
            </label>
            <input
              id="username"
              type="usernmame"
              placeholder="Enter username"
              autoComplete="on"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/user/signup"
            className="text-blue-700 font-medium hover:underline"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
