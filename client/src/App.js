import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Waiter Calling System</h1>
      <ul>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/waiter">Waiter Dashboard</Link></li>
        <li><Link to="/table/1">Example Table (1)</Link></li>
      </ul>
    </div>
  );
}
