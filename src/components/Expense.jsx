import ParallexWrapper from "./ParallexWrapper";
import background from "../assets/cm-background.jpg";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  doc,
  db,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  Timestamp,
} from "../config/firebase-config.js";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useExpenses } from "../contexts/EXpensesContext.jsx";
import { CalendarDays } from "lucide-react";

const Expense = () => {
  const { user } = useAuth();
  const { setBalance } = useExpenses();
  const navigate = useNavigate();
  const { id } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [expenseData, setExpenseData] = useState({});

  useEffect(() => {
    if (id) {
      setEditMode(true);
      fetchExpense();
    }
  }, [id]);

  const fetchExpense = async () => {
    try {
      const docRef = doc(db, "expenses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setExpenseData(docSnap.data());
      } else {
        toast.error("Expense not found");
      }
    } catch (error) {
      toast.error("Failed to fetch expense data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const amount = parseFloat(form.amount.value);
    const category = form.category.value;
    const date = form.date.value;
    const note = form.note.value;

    if (!title || !amount || !category || !date) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("User not found");
        return;
      }

      const currentBalance = userSnap?.data().balance || 0;

      if (editMode) {
        const expenseRef = doc(db, "expenses", id);
        const oldAmount = expenseData.amount || 0;
        const balanceDelta = oldAmount - amount;

        if (currentBalance + oldAmount < amount) {
          toast.warning("Insufficient balance after update!");
          return;
        }

        await updateDoc(expenseRef, {
          title,
          amount,
          category,
          date,
          note,
        });

        await updateDoc(userRef, {
          balance: currentBalance + oldAmount - amount,
        });

        toast.success("Expense updated successfully!");
      } else {
        if (currentBalance < amount) {
          toast.warning("Insufficient balance!");
          return;
        }

        await addDoc(collection(db, "expenses"), {
          title,
          amount,
          category,
          date,
          note,
          userId: user.uid,
          createdAt: new Date(),
        });

        await updateDoc(userRef, {
          balance: currentBalance - amount,
        });

        setBalance(currentBalance - amount);

        toast.success("Expense added successfully!");
        form.reset();
      }

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit expense");
    }
  };

  return (
    <ParallexWrapper>
      <div
        className="bg-cover bg-center bg-no-repeat w-full min-h-screen"
        style={{ backgroundImage: `url(${background})` }}
      >
        <TopNavbar />
        <Navbar />
        <section className="py-16">
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 w-full max-w-lg mx-auto shadow-2xl text-white"
          >
            <h2 className="text-3xl font-bold mb-6 text-center font-[Oxanium]">
              {editMode ? "Edit Expense" : "Add New Expense"}
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                defaultValue={expenseData.title || ""}
                placeholder="📝 Expense Title"
                required
                className="bg-white/20 px-4 py-3 rounded-md placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="number"
                name="amount"
                defaultValue={expenseData.amount || ""}
                placeholder="💰 Amount (Rs)"
                required
                className="bg-white/20 px-4 py-3 rounded-md placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <select
                name="category"
                defaultValue={expenseData.category || ""}
                required
                className="bg-white/20 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="" disabled >
                  Select Category
                </option>
                <option value="Food" className="text-black bg-slate-500">🍔 Food</option>
                <option value="Travel" className="text-black bg-slate-500">✈️ Travel</option>
                <option value="Shopping" className="text-black bg-slate-500">🛍️ Shopping</option>
                <option value="Bills" className="text-black bg-slate-500">📩 Bills</option>
                <option value="Others" className="text-black bg-slate-500">📦 Others</option>
              </select>

              <div className="relative">
                <input
                  type="date"
                  name="date"
                  defaultValue={expenseData.date || ""}
                  required
                  className="bg-white/20 px-4 py-3 rounded-md focus:outline-none text-white w-full pr-10 focus:ring-2 focus:ring-purple-500"
                />
                
              </div>

              <textarea
                name="note"
                defaultValue={expenseData.note || ""}
                placeholder="🗒️ Optional Note"
                rows={3}
                className="bg-white/20 px-4 py-3 rounded-md placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold px-6 py-3 mt-4 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all"
              >
                {editMode ? "Update Expense" : "Submit Expense"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </ParallexWrapper>
  );
};

export default Expense;
