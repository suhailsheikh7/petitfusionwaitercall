import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function TablePage() {
  const { tableId } = useParams();
  const callWaiter = async () => {
    await api.post(`/api/call-waiter/${tableId}`);
    alert("Waiter has been called!");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Table {tableId}</h1>
      <button onClick={callWaiter}>Call Waiter</button>
    </div>
  );
}
