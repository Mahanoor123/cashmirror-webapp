import {useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();
    const navigate = useNavigate();

  if (loading) {
    return (
      <header className="flex justify-between items-center border-b border-b-slate-400 px-12 py-2 shadow-sm">
        <p className="text-white">Loading...</p>
      </header>
    );
  }

  if (!user) return navigate("/login");

  return children;
};

export default ProtectedRoutes;
