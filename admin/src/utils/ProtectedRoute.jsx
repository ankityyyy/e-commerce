import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

export default function ProtectedRoute() {
  const { user, authLoading } = useSelector((state) => state.auth);

if (authLoading) return <Spinner />;

return user ? <Outlet /> : <Navigate to="/login" replace />;
}
 