import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const DetailedReport = () => {
  const token =
    useSelector((state) => state.admin?.admindetails?.admin_token) ||
    localStorage.getItem("admin_token");
  const { id } = useParams(); // Get the report ID from the URL
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      // console.log("token", token);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/reports/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
            },
          }
        );
        console.log(res);
        setReport(res.data); // Axios auto-parses JSON
      } catch (err) {
        console.error(
          "Error fetching reports:",
          err.response?.data || err.message
        );
      } finally {
        setIsLoading(false); // ✅ Always stop loading — whether success or error
      }
    };

    fetchReports();
  }, [id, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!report) {
    return <div>Report not found</div>;
  }

  const {
    title,
    category,
    status,
    submittedAt,
    encryptedContent,
    attachments,
  } = report;

  // Here we assume that the backend is handling decryption. If needed, you can decrypt content in frontend, but it's better done in the backend for security.
  // Simulating the decrypted content here.
  const { content } = report;
  const decryptedContent = content;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <button
        onClick={() => navigate("/admin/view")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Back to Reports
      </button>

      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <div className="mb-4">
        <strong>Category:</strong> {category}
      </div>

      <div className="mb-4">
        <strong>Status:</strong> {status}
      </div>

      <div className="mb-4">
        <strong>Submitted At:</strong> {new Date(submittedAt).toLocaleString()}
      </div>

      <div className="mb-4">
        <strong>Report Content:</strong>
        <pre className="mt-2">{decryptedContent}</pre>
      </div>

      {/* Display attachments if any */}
      {attachments && attachments.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Attachments:</h2>
          <ul className="mt-2">
            {attachments.map((attachment, index) => (
              <li key={index}>
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {attachment.filename}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailedReport;
