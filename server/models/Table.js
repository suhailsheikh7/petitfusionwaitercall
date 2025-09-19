import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  status: { type: String, enum: ["idle", "calling"], default: "idle" }
});

export default mongoose.model("Table", tableSchema);
