import { NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CoinsIcon, File, LayoutDashboard, SaveIcon, Wallet } from "lucide-react";


const Navbar = () => {
    return (
      <AnimatePresence mode="wait">
        <nav className="flex justify-center items-center gap-8 py-3  text-[#f4f4f4]">
          <NavLink to="/dashboard" className="hover:text-purple-500 flex gap-1"><LayoutDashboard className="w-5"/> Dashboard</NavLink>
          <NavLink to="/budget" className="hover:text-purple-500 flex gap-1"><Wallet className="w-5"/> My Budget</NavLink>
          <NavLink to="/expense" className="hover:text-purple-500 flex gap-1"><CoinsIcon className="w-5"/> My Expense</NavLink>
          <NavLink to="/savings" className="hover:text-purple-500 flex gap-1" ><SaveIcon className="w-5"/> My Savings</NavLink>
          <NavLink to="/reports" className="hover:text-purple-500 flex gap-1"><File className="w-5"/> Reports</NavLink>
        </nav>
        </AnimatePresence>
      );
  };
  
  export default Navbar;
  