import { useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router";

export default function UserSignIn() {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    await toast.promise(
      axios.post("/api/userLogin", {
        identifier,
        password,
      }),
      {
        loading: "Authenticating...",
        success: (res) => {
          // store JWT here if needed
          const token = res.data.token;
          localStorage.setItem("user_token", token);
          setTimeout(() => navigate("/user/dashboard"), 500);
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
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="identifier"
            >
              Username or Email
            </label>
            <input
              id="identifier"
              type="text"
              placeholder="Enter your username or email"
              autoComplete="off"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
