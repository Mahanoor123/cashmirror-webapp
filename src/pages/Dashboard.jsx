import background from "../assets/cm-background.jpg";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";
import { ArrowUpRight, ChartBar, CoinsIcon, PencilIcon } from "lucide-react";
import ParallexWrapper from "../components/ParallexWrapper";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
} from "../config/firebase-config.js";

const Dashboard = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

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

        setExpenses(expensesData);

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
    navigate("/expense");
  };

  return (
    <ParallexWrapper>
      <div
        className="bg-cover bg-center bg-no-repeat w-full min-h-screen"
        style={{ backgroundImage: `url(${background})` }}
      >
        <TopNavbar />
        <Navbar />

        <section className="flex flex-col gap-16 mx-12 mt-16">
          <div className="w-full flex justify-between gap-9">
            {/* Left column cards */}
            <div className=" flex flex-col gap-9">
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                <h1 className="text-white text-5xl font-[Oxanium] font-bold">
                  Current Balance
                </h1>
                <div className="flex gap-2 items-center text-white text-lg py-2">
                  <CoinsIcon className="text-blue-700" />
                  <p className="text-2xl">${balance?.toFixed(2)}</p>
                  <PencilIcon
                    onClick={navigateBudget}
                    className="w-5 h-5 ml-4 text-white cursor-pointer hover:text-blue-500 transition"
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                <h1 className="text-white text-5xl font-[Oxanium] font-bold">
                  Expense Amount
                </h1>
                <div className="flex gap-2 items-center text-white text-lg py-2">
                  <CoinsIcon className="text-blue-700" />
                  <p className="text-2xl">{totalExpense.toFixed(2)}</p>
                  <PencilIcon
                    onClick={navigateExpense}
                    className="w-5 h-5 ml-4 text-white cursor-pointer hover:text-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Right-side Analytics */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
              <h1 className="text-white text-5xl font-[Oxanium] font-bold">
                Analytics Chart
              </h1>
              <div className="flex gap-2 items-center text-white text-lg py-2">
                <CoinsIcon className="text-blue-700" />
                <p>0.00</p>
              </div>
            </div>
          </div>

          {/* Expense History */}
          <div className="my-12">
            <h1 className="text-4xl mb-3 text-white font-bold">
              Expenses History
            </h1>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
              {expenses.length === 0 ? (
                <p className="text-white/60">No expenses found.</p>
              ) : (
                <table className="w-full text-left text-sm text-white">
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
                      <tr className="hover:bg-white/10 transition">
                        <td className="py-3 px-4">{expense?.category}</td>
                        <td className="py-3 px-4">{expense?.title}</td>
                        <td className="py-3 px-4">{expense?.note}</td>
                        <td className="py-3 px-4">
                          {parseFloat(expense.amount).toFixed(2)}
                        </td>
                        <td className="py-3 px-4">{expense?.date}</td>
                        <td className="py-3 px-4 flex gap-2">
                          <button className="px-3 py-1 rounded-md bg-purple-500 text-white text-xs hover:bg-purple-600 transition">
                            Edit
                          </button>
                          <button className="px-3 py-1 rounded-md bg-red-500 text-white text-xs hover:bg-red-600 transition">
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
