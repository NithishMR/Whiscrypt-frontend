import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

let currentReports = [
  {
    _id: "rpt001",
    title: "Suspicious Transaction",
    category: "Financial",
    status: "pending",
    submittedAt: "2025-04-05T17:18:57.177Z",
  },
  {
    _id: "rpt002",
    title: "Unauthorized Access Attempt",
    category: "Security",
    status: "in-review",
    submittedAt: "2025-04-10T10:45:22.000Z",
  },
  {
    _id: "rpt003",
    title: "Fake Vendor Activity",
    category: "Fraud",
    status: "resolved",
    submittedAt: "2025-04-15T08:33:00.000Z",
  },
  {
    _id: "rpt004",
    title: "Delayed Invoice Clearance",
    category: "Operations",
    status: "pending",
    submittedAt: "2025-04-17T14:10:45.000Z",
  },
  {
    _id: "rpt005",
    title: "Insider Trading Suspicion",
    category: "Compliance",
    status: "in-review",
    submittedAt: "2025-04-20T16:00:00.000Z",
  },
];

const AdminReportsTable = () => {
  const token =
    useSelector((state) => state.admin?.admindetails?.admin_token) ||
    localStorage.getItem("admin_token");

  const [reports, setReports] = useState(currentReports); // Initially using dummy data
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      // console.log("token", token);
      try {
        const res = await axios.get("http://localhost:5000/api/admin/reports", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        });

        setReports(res.data); // Axios auto-parses JSON
      } catch (err) {
        console.error(
          "Error fetching reports:",
          err.response?.data || err.message
        );
      }
    };

    fetchReports();
  }, []);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const paginatedReports = reports.slice(indexOfFirstReport, indexOfLastReport); // Renamed to avoid conflict

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">All Reports</h1>
      <table className="w-full table-auto border border-gray-300 rounded-md shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {paginatedReports.map((report) => (
            <tr
              key={report._id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/admin/reports/${report._id}`)}
            >
              <td className="px-4 py-2">{report.title}</td>
              <td className="px-4 py-2">{report.category}</td>
              <td className="px-4 py-2 capitalize">{report.status}</td>
              <td className="px-4 py-2">
                {new Date(report.submittedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from(
          { length: Math.ceil(reports.length / reportsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AdminReportsTable;
