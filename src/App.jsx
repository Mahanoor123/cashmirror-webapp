import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Budget from "./components/Budget";
import Expense from "./components/Expense";
import SignupForm from "./pages/SignupForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/", element: <Home /> },
        {
          path: "dashboard",
          element: (
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          ),
        },

        {
          path: "budget",
          element: (
            <ProtectedRoutes>
              <Budget />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/add-expense",
          element: (
            <ProtectedRoutes>
              <Expense />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/edit-expense/:id",
          element: (
            <ProtectedRoutes>
              <Expense />
            </ProtectedRoutes>
          ),
        },
        { path: "/profile/:id", element: <Profile /> },
        { path: "login", element: <LoginForm /> },
        { path: "signup", element: <SignupForm /> },
        { path: "*", element: <PageNotFound />},
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
