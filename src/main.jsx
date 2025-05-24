import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ExpensesProvider } from "./contexts/EXpensesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ExpensesProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ExpensesProvider>
  </AuthProvider>
);
