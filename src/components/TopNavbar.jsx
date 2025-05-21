import { User2Icon } from "lucide-react";
import logo from "../assets/cashmirror-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const TopNavbar = () => {
  const { user, userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = confirm("Are you sure to logout?");
    if (confirmLogout) {
      await logout();
      toast.success("You've been logout successfully!", {autoClose: 1500});
      setTimeout(() => {
      navigate("/login");
    }, 2000);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <header className="flex justify-between items-center border-b border-b-slate-400 px-12 py-2 shadow-sm">
        {/* Logo */}
        <img src={logo} alt="CashMirror" className="w-10" />

        {/* Conditional Rendering based on user */}
        {user ? 
        (
          
          <div className="flex items-center gap-4">
            <User2Icon className="border border-slate-600 rounded-full bg-slate-400 text-white w-8 h-8 p-1" />
            <div className="text-sm">
              <h1 className="font-medium text-white">{userData?.name}</h1>
              <div className="flex gap-2 mt-1">
                <button className="text-blue-600 hover:underline">
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <NavLink to="/login">
            <div>
              <button className="bg-purple-900 text-white px-6 py-1">
                Login
              </button>
            </div>
          </NavLink>
        )}
      </header>
    </>
  );
};

export default TopNavbar;
