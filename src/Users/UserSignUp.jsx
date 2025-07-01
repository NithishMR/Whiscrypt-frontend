import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import names from "../utils/usernames";
// Generates something like "wolf_928"
function generateRandomUsername() {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomNumber = Math.floor(100 + Math.random() * 900); // 100–999
  return `${randomName}_${randomNumber}`;
}

export default function UserSignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();

    const finalUsername = userName.trim() || generateRandomUsername();

    await toast.promise(
      axios.post("http://localhost:5000/api/auth/register", {
        username: finalUsername,
        email,
        password,
      }),
      {
        loading: "Creating anonymous account...",
        success: () => "Account created! You can now submit or track reports.",
        error: "Sign-up failed. Please try again.",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster richColors position="top-center" />

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <p className="text-center text-sm text-gray-500 mb-2">
          For Anonymous Users
        </p>
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmission}>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Leave blank for anonymous ID"
              autoComplete="off"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/user/signin"
            className="text-blue-700 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
