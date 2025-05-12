import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Budget from "./components/Budget";
import Expense from "./components/Expense";
import Savings from "./components/Savings";
import Reports from "./components/Reports";
import SignupForm from "./pages/SignupForm";

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "budget", element: <Budget /> },
      { path: "expense", element: <Expense /> },
      { path: "savings", element: <Savings /> },
      { path: "report", element: <Reports /> },
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <SignupForm /> }
    ],
  },
]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
