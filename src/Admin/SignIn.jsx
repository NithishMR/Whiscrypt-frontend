import { useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router";

// Success Toast
// const SuccessToast = () => {
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ status: "Login Successful!" });
//     }, 2000);
//   });

//   toast.promise(promise, {
//     loading: "Authenticating...",
//     success: (data) => data.status,
//     error: "Error on our side. But login successful!",
//   });
// };

// Failure Toast
// const failureToast = () => {
//   toast.error("Invalid credentials. Please try again.");
// };

export default function AdminSignIn() {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Use toast.promise to show toast during the request lifecycle
    await toast.promise(
      axios.post("/api/adminLogin", {
        identifier: identifier,
        password: password,
      }),
      {
        loading: "Authenticating...",
        success: () => {
          // 👇 Navigate to admin panel on success
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 2000); // short delay to allow toast to show
          return "Login Successful! Wait while we redirect you";
        },
        error: "Invalid credentials or server error.",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster richColors position="top-center" />

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        {/* <p className="text-center text-sm text-gray-500 mb-2">
          For Administrator
        </p> */}
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Enter username or email"
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
            className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition"
          >
            Log In
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Don't have an admin account?{" "}
          <Link
            to="/admin/signup"
            className="text-purple-700 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
