import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import background from "../assets/cm-background.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import ParallexWrapper from "../components/ParallexWrapper";
import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  db,
  setDoc,
} from "../config/firebase-config.js";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [passwordRules, setPasswordRules] = useState({
    minLength: false,
    hasLetter: false,
    hasNumber: false,
    hasSymbol: false,
  });

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const resetPasswordFieldState = () => {
    setPassword("");
    setIsPasswordFocused(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPasswordRules({
        minLength: value.length >= 8,
        hasLetter: /[A-Za-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
      });
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = () => {
    return (
      passwordRules.minLength &&
      passwordRules.hasLetter &&
      passwordRules.hasNumber &&
      passwordRules.hasSymbol
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return toast.error("Please fill in fields");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords must match");
    }

    if (!validatePassword()) {
      return toast.error("Password does not meet the required criteria");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        uid: user.uid,
        createdAt: new Date(),
      });
      toast.success("User created successfully");
      resetPasswordFieldState();
      setPasswordRules({
        minLength: false,
        hasLetter: false,
        hasNumber: false,
        hasSymbol: false,
      });
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <ParallexWrapper>
      <ToastContainer position="top-right" />
      <div
        className="bg-cover bg-center bg-no-repeat h-screen w-screen fixed top-0 left-0 flex items-center justify-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <form
          onSubmit={handleRegister}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-10 w-[90%] max-w-md flex flex-col items-center gap-6 text-white"
        >
          <h1 className="text-4xl font-light tracking-wide mb-2">Signup</h1>

          <div className="w-full relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="pl-10 pr-4 py-3 w-full bg-white/10 text-white placeholder-white/60 rounded-lg outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>

          <div className="w-full relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="pl-10 pr-4 py-3 w-full bg-white/10 text-white placeholder-white/60 rounded-lg outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>

          <div className="w-full relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              placeholder="Password"
              required
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

          {/* Password Rule Checklist */}
          {isPasswordFocused && (
            <div className="grid grid-cols-2 text-sm mt-1 space-y-1">
              <p
                className={
                  passwordRules.minLength ? "text-green-500" : "text-red-500"
                }
              >
                {passwordRules.minLength ? "✔" : "✘"} At least 8 characters
              </p>
              <p
                className={
                  passwordRules.hasLetter ? "text-green-500" : "text-red-500"
                }
              >
                {passwordRules.hasLetter ? "✔" : "✘"} At least one letter
              </p>
              <p
                className={
                  passwordRules.hasNumber ? "text-green-500" : "text-red-500"
                }
              >
                {passwordRules.hasNumber ? "✔" : "✘"} At least one number
              </p>
              <p
                className={
                  passwordRules.hasSymbol ? "text-green-500" : "text-red-500"
                }
              >
                {passwordRules.hasSymbol ? "✔" : "✘"} At least one special
                symbol
              </p>
            </div>
          )}

          <div className="w-full relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-type Password"
              className="pl-10 pr-10 py-3 w-full bg-white/10 text-white placeholder-white/60 rounded-lg outline-none focus:ring-2 focus:ring-white/40 transition"
            />
            {showConfirmPassword ? (
              <Eye
                onClick={() => setShowConfirmPassword(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 cursor-pointer"
              />
            ) : (
              <EyeOff
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 cursor-pointer"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-800 hover:bg-white/30 transition duration-200 text-white font-medium rounded-lg"
          >
            SignUp
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
            <NavLink to="/login" className="underline hover:text-purple-800">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </ParallexWrapper>
  );
};

export default LoginForm;
