import { Mail, Lock, Eye, EyeOff, Chrome } from "lucide-react";
import background from "../assets/cm-background.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import ParallexWrapper from "../components/ParallexWrapper";
import { useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  provider,
  signInWithPopup,
  sendPasswordResetEmail
} from "../config/firebase-config.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      return toast.error("Please fill in all fields");
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );

      toast.success("You've logged in successfully");
      navigate('/dashboard');
    } catch (error) {
      console.error("Log-In Error:", error.message);
      toast.error("Log-In failed");
    }
    setLoginData({ email: "", password: "" });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Google SignIn Successful! ");
      navigate('/dashboard');
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      toast.error("Google Sign-In failed");
    }
  };

  const handleForgotPassword = async () => {
    if (!loginData.email) {
      toast.error("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, loginData.email);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Forgot Password Error:", error.message);
      toast.success("Error sending reset email. Try again.");
    }
  };

  return (
    <ParallexWrapper>
      <ToastContainer position="top-right" />
      <div
        className="bg-cover bg-center bg-no-repeat h-screen w-screen fixed top-0 left-0 flex items-center justify-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <form
          onSubmit={handleLogin}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-10 w-[90%] max-w-md flex flex-col items-center gap-6 text-white"
        >
          <h1 className="text-4xl font-light tracking-wide mb-2">
            Welcome Back
          </h1>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition rounded-lg font-medium"
          >
            <Chrome size={20} />
            Login with Google
          </button>

          <div className="w-full relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="pl-10 pr-4 py-3 w-full bg-white/10 text-white placeholder-white/60 rounded-lg outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>

          <div className="w-full relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="pl-10 pr-10 py-3 w-full bg-white/10 text-white placeholder-white/60 rounded-lg outline-none focus:ring-2 focus:ring-white/40 transition"
            />
            {showPassword ? (
              <Eye
                onClick={() => setShowPassword(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 cursor-pointer"
              />
            ) : (
              <EyeOff
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 cursor-pointer"
              />
            )}
          </div>

          {/* Forgot Password */}
          <div className="w-full text-right text-sm">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-white/60 hover:text-purple-800 underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-800 hover:bg-white/30 transition duration-200 text-white font-medium rounded-lg"
          >
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
        </form>
      </div>
    </ParallexWrapper>
  );
};

export default LoginForm;
