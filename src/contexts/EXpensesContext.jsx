import { createContext, useContext, useEffect, useState } from "react";
import {
  db,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "../config/firebase-config";
import { useAuth } from "./AuthContext";

const ExpensesContext = createContext();

export const useExpenses = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const exp = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(
        exp.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
      );
    });

    const fetchBalance = async () => {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        setBalance(snap.data().balance || 0);
      }
    };

    fetchBalance();

    return () => unsubscribe();
  }, [user]);

  return (
    <ExpensesContext.Provider value={{ expenses, balance, setBalance }}>
      {children}
    </ExpensesContext.Provider>
  );
};
