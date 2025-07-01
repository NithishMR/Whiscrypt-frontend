import React, { useEffect, useState } from "react";
import ChatBot from "../Chatbot/Chatbot";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../Redux/userSlice";

const ReportForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [attachments, setAttachments] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  // Hydrate Redux from localStorage after refresh
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  // Get token from Redux or fallback to localStorage
  const redux_token = useSelector((state) => state.user.userdetails.user_token);
  const user_token = redux_token || localStorage.getItem("user_token");

  const handleAttachmentChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/reports/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
        body: JSON.stringify({
          title,
          content,
          category,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit report");

      alert("Report submitted successfully!");
      setTitle("");
      setContent("");
      setCategory("General");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Submit a Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            className="w-full mt-1 p-2 border rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Financial">Financial</option>
            <option value="Ethical">Ethical</option>
            <option value="Harassment">Harassment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            className="w-full mt-1 p-2 border rounded-md h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Uncomment when attachments are handled in backend */}
        {/* <div>
          <label className="block text-sm font-medium">Attachments (Optional)</label>
          <input
            type="file"
            multiple
            onChange={handleAttachmentChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div> */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default ReportForm;
