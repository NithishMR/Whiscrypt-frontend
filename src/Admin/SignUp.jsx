import { useState } from "react";
import { Link } from "react-router";
import { Toaster, toast } from "sonner";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault(); // Prevent form reload

    await toast.promise(
      axios.post("/api/adminSignUp", {
        username: userName,
        emailID: userEmail,
        password: password,
      }),
      {
        loading: "Sending account details...",
        success: () =>
          "Account created successfully. You can become an admin after approval.",
        error: "Sign-up failed. Please try again.",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster richColors position="top-center" />

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <p className="text-center text-sm text-gray-500 mb-2">
          For Administrator
        </p>
        <h1 className="text-2xl font-bold text-center mb-6">
          Create your account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmission}>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              autoComplete="off"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              autoComplete="off"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/admin/signin"
            className="text-purple-700 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
