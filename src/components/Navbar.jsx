import { NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  CoinsIcon,
  LayoutDashboard,
  Wallet,
} from "lucide-react";

const Navbar = () => {
  const linkStyles = ({ isActive }) =>
    `flex gap-1 items-center transition-colors ${
      isActive ? "text-purple-500 font-semibold" : "text-[#f4f4f4] hover:text-purple-400"
    }`;

  return (
    <AnimatePresence mode="wait">
      <nav className="flex justify-center items-center gap-8 py-3">
        <NavLink to="/dashboard" className={linkStyles}>
          <LayoutDashboard className="w-5" />
          Dashboard
        </NavLink>
        <NavLink to="/budget" className={linkStyles}>
          <Wallet className="w-5" />
          My Budget
        </NavLink>
        <NavLink to="/expense" className={linkStyles}>
          <CoinsIcon className="w-5" />
          My Expense
        </NavLink>
      </nav>
    </AnimatePresence>
  );
};

export default Navbar;
