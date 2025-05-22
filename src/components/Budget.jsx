import ParallexWrapper from "./ParallexWrapper";
import background from "../assets/cm-background.jpg";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";
import { CheckIcon, CoinsIcon, PencilIcon, XIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
 doc, db, getDoc, updateDoc
} from "../config/firebase-config.js";

const Budget = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [inputBalance, setInputBalance] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setBalance(data?.balance || 0);
      }
    };

    fetchBalance();
  }, [user]);

  const handleUpdate = async () => {
    if (!inputBalance || isNaN(inputBalance)) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const addedBalance = parseFloat(inputBalance);
      const newBalance = balance + addedBalance;

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        balance: newBalance,
      });
      setBalance(newBalance);
      setInputBalance("");
      setEditMode(false);
      toast.success("Balance updated successfully!");
    } catch (error) {
      toast.error("Failed to update balance.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setInputBalance("");
    setEditMode(false);
  };

  return (
    <ParallexWrapper>
      <div
        className="bg-cover bg-center bg-no-repeat w-full min-h-screen"
        style={{ backgroundImage: `url(${background})` }}
      >
        <TopNavbar />
        <Navbar />

        {/* Content Area */}
        <section className="flex justify-center items-center py-20 px-6">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">
            <h2 className="text-white text-3xl font-semibold text-center tracking-wide">
              Add / Update Balance
            </h2>

            {/* Balance Display Row */}
            <div className="flex items-center justify-between text-white bg-white/5 border border-white/20 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <CoinsIcon className="text-yellow-400" />
                <span className="text-lg">Current Balance:</span>
              </div>
              <p className="text-xl font-bold">{balance?.toFixed(2)}</p>
              <PencilIcon
                className="w-5 h-5 text-blue-400 cursor-pointer hover:scale-110"
                onClick={() => setEditMode(true)}
              />
            </div>

            {/* Input Field */}
            {editMode && (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Enter new balance"
                  onChange={(e) => setInputBalance(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <CheckIcon
                  className="w-6 h-6 text-green-500 cursor-pointer hover:scale-110 transition"
                  onClick={handleUpdate}
                />
                <XIcon
                  className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 transition"
                  onClick={handleCancel}
                />
              </div>
            )}

            {/* Hint or Info */}
            <p className="text-sm text-white/70 text-center">
              Tip: Leave empty to keep current balance unchanged.
            </p>
          </div>
        </section>
      </div>
    </ParallexWrapper>
  );
};

export default Budget;
