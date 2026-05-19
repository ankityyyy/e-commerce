import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

export default function ProtectedRoute() {
  const { user, authLoading } = useSelector((state) => state.auth);

if (authLoading) return <Spinner />;

return user ? <Outlet /> : <Navigate to="/login" replace />;
}

//docker run -d --name redis-serve1r -p 6379:6379 redis  --legacy-peer-deps