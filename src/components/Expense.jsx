import ParallexWrapper from "./ParallexWrapper";
import background from "../assets/cm-background.jpg";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";
import { useState } from "react";
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

const Expense = () => {
  const { user } = useAuth();

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
        createdAt: new Date(),
      });

      await updateDoc(userRef, {
        balance: currentBalance - amount,
      });

      toast.success("Expense added successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add expense");
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
            className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 w-[35vw] mx-auto shadow-xl text-white"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Add New Expense
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Expense Title"
                required
                className="bg-white/20 px-4 py-2 rounded-md placeholder-white focus:outline-none"
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount (Rs)"
                required
                className="bg-white/20 px-4 py-2 rounded-md placeholder-white focus:outline-none"
              />

              <select
                name="category"
                required
                className="bg-white/20 px-4 py-2 rounded-md text-white focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="Food">🍔 Food</option>
                <option value="Travel">✈️ Travel</option>
                <option value="Shopping">🛍️ Shopping</option>
                <option value="Bills">📩 Bills</option>
                <option value="Others">📦 Others</option>
              </select>

              <input
                type="date"
                name="date"
                required
                className="bg-white/20 px-4 py-2 rounded-md focus:outline-none text-white"
              />

              <textarea
                name="note"
                placeholder="Optional Note"
                rows={3}
                className="bg-white/20 px-4 py-2 rounded-md placeholder-white focus:outline-none resize-none"
              />

              <button
                type="submit"
                className="bg-purple-600 text-white font-semibold px-6 py-2 mt-4 rounded-md hover:bg-purple-700 transition-all"
              >
                Submit Expense
              </button>
            </div>
          </form>
        </section>
      </div>
    </ParallexWrapper>
  );
};

export default Expense;
