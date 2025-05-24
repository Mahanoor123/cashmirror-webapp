import { NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CoinsIcon, Home, LayoutDashboard, Wallet } from "lucide-react";

const Navbar = () => {
  const linkStyles = ({ isActive }) =>
    `flex gap-1 items-center transition-colors ${
      isActive
        ? "text-purple-500 font-semibold"
        : "text-[#f4f4f4] hover:text-purple-400"
    }`;

  return (
    <AnimatePresence mode="wait">
      <nav className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 py-4 text-white text-sm sm:text-base">
         <NavLink to="/" className={linkStyles}>
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline ml-1">Home</span>
        </NavLink>

        <NavLink to="/dashboard" className={linkStyles}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="hidden sm:inline ml-1">Dashboard</span>
        </NavLink>

        <NavLink to="/budget" className={linkStyles}>
          <Wallet className="w-5 h-5" />
          <span className="hidden sm:inline ml-1">My Budget</span>
        </NavLink>

        <NavLink to="/add-expense" className={linkStyles}>
          <CoinsIcon className="w-5 h-5" />
          <span className="hidden sm:inline ml-1">My Expense</span>
        </NavLink>
      </nav>
    </AnimatePresence>
  );
};

export default Navbar;
