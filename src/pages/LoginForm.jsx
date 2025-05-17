import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  SquaresIntersect,
  Chrome,
} from "lucide-react";
import background from "../assets/cm-background.jpg";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen w-screen fixed top-0 left-0 flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-10 w-[90%] max-w-md flex flex-col items-center gap-6 text-white">
        <h1 className="text-4xl font-light tracking-wide mb-2">Welcome Back</h1>

        {/* Google Login */}
        <button className="w-full py-3 flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition rounded-lg font-medium">
          <Chrome size={20} />
          Login with Google
        </button>

        <div className="w-full relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          <input
            type="text"
            placeholder="Email"
            className="pl-10 pr-4 py-3 w-full bg-white/10 text-white placeholder-white/60 rounded-lg outline-none focus:ring-2 focus:ring-white/40 transition"
          />
        </div>

        <div className="w-full relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          <input
            type="password"
            placeholder="Password"
            className="pl-10 pr-10 py-3 w-full bg-white/10 text-white placeholder-white/60 rounded-lg outline-none focus:ring-2 focus:ring-white/40 transition"
          />
          <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 cursor-pointer" />
        </div>

        {/* Forgot Password */}
        <div className="w-full text-right text-sm">
          <a href="#" className="text-white/60 hover:text-purple-800 underline">
            Forgot Password?
          </a>
        </div>

        <button className="w-full py-3 bg-purple-800 hover:bg-white/30 transition duration-200 text-white font-medium rounded-lg">
          Login
        </button>

        {/* Divider */}
        <div className="w-full flex items-center gap-4">
          <hr className="flex-grow border-white/20" />
          <span className="text-white/50 text-sm">or</span>
          <hr className="flex-grow border-white/20" />
        </div>

        {/* Signup Link */}
        <p className="text-sm text-white/70">
          Don't have an account?{" "}
          <NavLink to="/signup" className="underline hover:text-purple-800">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
