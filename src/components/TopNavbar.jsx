import { User2Icon } from "lucide-react";
import logo from "../assets/cashmirror-logo.png";
import { NavLink } from "react-router-dom";

const TopNavbar = () => {
  return (
    <header className="flex justify-between items-center border-b border-b-slate-400 px-12 py-2 shadow-sm">
      {/* Logo */}
      <img src={logo} alt="CashMirror" className="w-10" />

      {/* User Info */}
      {/* <div className="flex items-center gap-4">
        <User2Icon className="border border-slate-600 rounded-full bg-slate-400 text-white w-8 h-8 p-1" />
        <div className="text-sm">
          <h1 className="font-medium text-white">Mahanoor Khan</h1>
          <div className="flex gap-2 mt-1">
            <button className="text-blue-600 hover:underline">Settings</button>
            <button className="text-red-500 hover:underline">Logout</button>
          </div>
        </div>
      </div> */}

      {/* Hidden Login Placeholder */}
      <NavLink to="/login">
        <div>
          <button className="bg-purple-900 text-white px-6 py-1">Login</button>
        </div>
      </NavLink>
    </header>
  );
};

export default TopNavbar;
