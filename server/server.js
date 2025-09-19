import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import webpush from "web-push";
import Table from "./models/Table.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// VAPID Keys
webpush.setVapidDetails(
  "mailto:admin@petitfusionwaitercall.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

let subscriptions = [];

// Save waiter subscription
app.post("/api/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: "Subscribed" });
});

// Call waiter
app.post("/api/call-waiter/:tableId", async (req, res) => {
  const { tableId } = req.params;
  const table = await Table.findByIdAndUpdate(tableId, { status: "calling" }, { new: true });
  if (!table) return res.status(404).json({ error: "Table not found" });

  io.emit("call", { tableId: table._id, tableNumber: table.tableNumber, time: new Date() });

  const payload = JSON.stringify({ title: "Waiter Call", body: `Table ${table.tableNumber} needs service` });
  subscriptions.forEach(sub => webpush.sendNotification(sub, payload).catch(err => console.error(err)));

  res.json({ ok: true, table });
});

// Serve route
app.get("/", (req, res) => {
  res.send("Petit Fusion Waiter Call API running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server running on port " + PORT));
