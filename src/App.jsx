import { Route, Routes } from "react-router";
import AdminSignUp from "./Admin/SignUp";
import Welcome from "./Welcome";
import AdminSignIn from "./Admin/SignIn";
import UserSignUp from "./Users/UserSignUp";
import UserSignIn from "./Users/UserSignIn";
import ReportForm from "./Report/ReportForm";
import AdminReportsTable from "./AdminReport/AdminReportsTable";
import DetailedReport from "./AdminReport/DetailedReport";

function App() {
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/user/signup" element={<UserSignUp />} />
          <Route path="/user/signin" element={<UserSignIn />} />
          <Route path="/user/report" element={<ReportForm />} />
          <Route path="/admin/view" element={<AdminReportsTable />} />
          <Route path="/admin/reports/:id" element={<DetailedReport />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
