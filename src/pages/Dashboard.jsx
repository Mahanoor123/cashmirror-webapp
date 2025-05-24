import background from "../assets/cm-background.jpg";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";
import { CoinsIcon, PencilIcon } from "lucide-react";
import ParallexWrapper from "../components/ParallexWrapper";
import { useAuth } from "../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  doc,
  db,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from "../config/firebase-config.js";
import { toast } from "react-toastify";
import { useExpenses } from "../contexts/EXpensesContext.jsx";
import ExpenseChart from "../components/charts/ExpenseChart.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const { expenses, balance } = useExpenses();
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenseRef = collection(db, "expenses");
        const q = query(expenseRef, where("userId", "==", user.uid));

        const snapshot = await getDocs(q);
        const expensesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTotalExpense(expensesData);

        const total = expensesData.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );
        setTotalExpense(total);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    fetchExpenses();
  }, [expenses]);

  const navigate = useNavigate();

  const navigateBudget = () => {
    navigate("/budget");
  };

  const navigateExpense = () => {
    navigate("/add-expense");
  };

  const handleDelete = async (expenseId, amount) => {
    const userId = user?.uid;
    const userRef = doc(db, "users", userId);
    const expenseRef = doc(db, "expenses", expenseId);

    try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return;

      const confirmDelete = confirm("Are you sure to delete this expense?");
      if (confirmDelete) {
        const currentBalance = userSnap.data().balance || 0;

        await deleteDoc(expenseRef);

        await updateDoc(userRef, {
          balance: currentBalance + parseFloat(amount),
        });

        toast.success("Expense deleted and balance updated!");
      }
    } catch (err) {
      toast.error("Failed to delete expense.");
      console.error(err);
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

        <section className="flex flex-col gap-12 px-4 sm:px-8 md:px-12 mt-10">
          <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-10">
            {/* Left Column */}
            <div className="flex flex-col gap-6 w-full lg:w-1/2">
              {/* Balance Card */}
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                <h1 className="text-white text-3xl sm:text-4xl font-[Oxanium] font-bold">
                  Current Balance
                </h1>
                <div className="flex flex-wrap gap-2 items-center text-white text-lg py-2">
                  <CoinsIcon className="text-blue-700" />
                  <p className="text-2xl">Rs {balance?.toFixed(2)}</p>
                  <PencilIcon
                    onClick={navigateBudget}
                    className="w-5 h-5 ml-4 text-white cursor-pointer hover:text-blue-500 transition"
                  />
                </div>
              </div>

              {/* Expense Card */}
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                <h1 className="text-white text-3xl sm:text-4xl font-[Oxanium] font-bold">
                  Expense Amount
                </h1>
                <div className="flex flex-wrap gap-2 items-center text-white text-lg py-2">
                  <CoinsIcon className="text-blue-700" />
                  <p className="text-2xl">{totalExpense.toFixed(2)}</p>
                  <PencilIcon
                    onClick={navigateExpense}
                    className="w-5 h-5 ml-4 text-white cursor-pointer hover:text-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Chart */}
            <div className="w-full lg:w-1/2 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
              <h1 className="text-white text-3xl sm:text-4xl font-[Oxanium] font-bold">
                Analytics Chart
              </h1>
              <div className="mt-4 text-white text-lg">
                <ExpenseChart expenses={expenses} />
              </div>
            </div>
          </div>

          {/* Expense History Table */}
          <div className="my-8">
            <h1 className="text-2xl sm:text-3xl mb-4 text-white font-bold">
              Expenses History
            </h1>
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg overflow-x-auto">
              {expenses.length === 0 ? (
                <p className="text-white/60">No expenses found.</p>
              ) : (
                <table className="min-w-[700px] w-full text-left text-sm text-white">
                  <thead>
                    <tr className="uppercase text-white/60 text-xs border-b border-white/10">
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr
                        key={expense?.id}
                        className="hover:bg-white/10 transition"
                      >
                        <td className="py-3 px-4">{expense?.category}</td>
                        <td className="py-3 px-4">{expense?.title}</td>
                        <td className="py-3 px-4">{expense?.note}</td>
                        <td className="py-3 px-4">Rs {expense?.amount}</td>
                        <td className="py-3 px-4">{expense?.date}</td>
                        <td className="py-3 px-4 flex flex-wrap gap-2">
                          <NavLink to={`/edit-expense/${expense.id}`}>
                            <button className="px-3 py-1 rounded-md bg-purple-500 text-white text-xs hover:bg-purple-600 transition">
                              Edit
                            </button>
                          </NavLink>
                          <button
                            onClick={() =>
                              handleDelete(expense.id, expense.amount)
                            }
                            className="px-3 py-1 rounded-md bg-red-500 text-white text-xs hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </div>
    </ParallexWrapper>
  );
};

export default Dashboard;
