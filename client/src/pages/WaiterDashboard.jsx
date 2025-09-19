import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../utils/api";

export default function WaiterDashboard() {
  const [calls, setCalls] = useState([]);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on("call", (data) => {
      setCalls((prev) => [...prev, data]);
      new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg").play();
    });
  }, []);

  const subscribeUser = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_KEY)
      });
      await api.post("/api/subscribe", sub);
      alert("Push notifications enabled");
    }
  };

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  }

  return (
    <div>
      <h1>Waiter Dashboard</h1>
      <button onClick={subscribeUser}>Enable Push Notifications</button>
      <ul>
        {calls.map((c, i) => (
          <li key={i}>Table {c.tableNumber} called at {new Date(c.time).toLocaleTimeString()}</li>
        ))}
      </ul>
    </div>
  );
}
