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
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "dashboard",
          element: (
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          ),
        },
        { path: "budget", element: <Budget /> },
        { path: "expense", element: <Expense /> },
        { path: "savings", element: <Savings /> },
        { path: "report", element: <Reports /> },
        { path: "login", element: <LoginForm /> },
        { path: "signup", element: <SignupForm /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </>
  );
}

export default App;
