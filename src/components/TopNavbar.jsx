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
      localStorage.removeItem("currentUserId");
      toast.success("You've been logout successfully!", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <header className="flex justify-between items-center border-b border-slate-400 px-4 sm:px-6 md:px-10 lg:px-12 py-3 shadow-sm  backdrop-blur-md">
        {/* Logo */}
        <img src={logo} alt="CashMirror" className="w-8 sm:w-10" />

        {/* Conditional Rendering based on user */}
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3 text-white max-w-[70%] sm:max-w-none">
            <User2Icon className="border border-slate-600 rounded-full bg-slate-400 text-white w-8 h-8 p-1 shrink-0" />

            <div className="text-xs sm:text-sm">
              <h1 className="font-semibold truncate max-w-[120px] sm:max-w-none">
                {userData?.name}
              </h1>

              <div className="flex flex-wrap gap-2 mt-1">
                <NavLink to={`/profile/${user?.uid}`}>
                  <button className="text-purple-400 hover:underline text-xs sm:text-sm">
                    Settings
                  </button>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:underline text-xs sm:text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <NavLink to="/login">
            <button className="bg-purple-800 text-white px-4 sm:px-6 py-1 rounded text-sm hover:bg-purple-700 transition-all">
              Login
            </button>
          </NavLink>
        )}
      </header>
    </>
  );
};

export default TopNavbar;
