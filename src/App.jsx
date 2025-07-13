import { Route, Routes } from "react-router";
import AdminSignUp from "./Admin/SignUp";
import Welcome from "./Welcome";
import AdminSignIn from "./Admin/SignIn";
import UserSignUp from "./Users/UserSignUp";
import UserSignIn from "./Users/UserSignIn";
import ReportForm from "./Report/ReportForm";
import AdminReportsTable from "./AdminReport/AdminReportsTable";
import DetailedReport from "./AdminReport/DetailedReport";
import ProtectedRoute from "./Route-Guarding/ProtectedRoute";
import Unauthorized from "./Unauthorized/Unauthorized";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/user/signin" element={<UserSignIn />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/user/report"
          element={
            <ProtectedRoute role="user">
              <ReportForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/view"
          element={
            <ProtectedRoute role="admin">
              <AdminReportsTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports/:id"
          element={
            <ProtectedRoute role="admin">
              <DetailedReport />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
