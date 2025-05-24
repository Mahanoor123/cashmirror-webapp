import ParallexWrapper from "./ParallexWrapper";
import background from "../assets/cm-background.jpg";
import TopNavbar from "../components/TopNavbar";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { updateEmail, updatePassword, deleteUser } from "firebase/auth";
import { User, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(userData?.photo || "");
  const [preview, setPreview] = useState(userData?.photo || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name, photo });

      if (user.email !== email) {
        await updateEmail(user, email);
      }

      if (password) {
        await updatePassword(user, password);
      }

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      const userRef = doc(db, "users", user.uid);
      await deleteDoc(userRef);
      await deleteUser(user);
      toast.success("Account deleted successfully!");
      navigate("/")
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete account");
    }
  };

  return (
    <ParallexWrapper>
      <div
        className="bg-cover bg-center bg-no-repeat w-full min-h-screen"
        style={{ backgroundImage: `url(${background})` }}
      >
        <TopNavbar />
        <section className="py-12 px-4 sm:px-6 lg:px-12">
          <form
            onSubmit={handleUpdate}
            className="p-6 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white flex flex-col gap-5"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-center">
              Edit Profile
            </h1>

            <div className="flex justify-center">
              <div className="relative flex flex-col items-center gap-3">
                {preview || photo ? (
                  <img
                    src={preview || photo}
                    alt="Profile"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-white/20 border-2 border-white text-white shadow-lg">
                    <UserRound className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                )}
              </div>
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="bg-white/20 px-4 py-2 rounded-md placeholder-white text-sm sm:text-base focus:outline-none"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="bg-white/20 px-4 py-2 rounded-md placeholder-white text-sm sm:text-base focus:outline-none"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password (optional)"
              className="bg-white/20 px-4 py-2 rounded-md placeholder-white text-sm sm:text-base focus:outline-none"
            />

            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-purple-700 transition-all text-base sm:text-lg"
            >
              Update Profile
            </button>

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="text-red-400 hover:text-red-600 text-xs sm:text-sm mt-2 underline self-center"
            >
              Delete Account
            </button>
          </form>
        </section>
      </div>
    </ParallexWrapper>
  );
};

export default Profile;
