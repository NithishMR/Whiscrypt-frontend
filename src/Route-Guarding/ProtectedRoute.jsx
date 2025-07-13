import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const { userdetails } = useSelector((state) => state.user);
  const { admindetails } = useSelector((state) => state.admin);

  const currentRole = userdetails?.user_token
    ? "user"
    : admindetails?.admin_token
    ? "admin"
    : null;

  if (!currentRole) return <Navigate to="/unauthorized" />;
  if (requiredRole && currentRole !== requiredRole)
    return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
