import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import TablePage from "./pages/TablePage";
import WaiterDashboard from "./pages/WaiterDashboard";
import Admin from "./pages/Admin";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/table/:tableId" element={<TablePage />} />
      <Route path="/waiter" element={<WaiterDashboard />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);

serviceWorkerRegistration.register();
