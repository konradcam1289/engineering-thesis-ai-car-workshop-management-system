import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";

const repairStatusMap: Record<string, string> = {
  pending: "Oczekujące",
  in_progress: "W trakcie naprawy",
  completed: "Zakończone",
  cancelled: "Anulowane"
};

const paymentStatusMap: Record<string, string> = {
  paid: "Opłacone",
  unpaid: "Nieopłacone"
};

const paymentMethodMap: Record<string, string> = {
  card: "Karta",
  cash: "Gotówka",
  blik: "BLIK",
  online: "Online"
};

const ManageOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest("/api/worker/orders", { method: "GET" })
      .then(setOrders)
      .catch((err) => console.error(" Błąd ładowania zamówień:", err));
  }, []);

  const deleteOrder = (id: number) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę rezerwację?")) return;

    apiRequest(`/api/worker/orders/${id}`, { method: "DELETE" })
      .then(() => {
        setOrders((prev) => prev.filter((o) => o.id !== id));
      })
      .catch((err) => console.error(" Błąd usuwania rezerwacji:", err));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <HiOutlineClipboardList className="text-3xl text-blue-700" />
        Zamówienia do obsługi
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Klient</th>
              <th className="p-2 text-left">Data</th>
              <th className="p-2 text-left">Usługi</th>
              <th className="p-2 text-left">Metoda</th>
              <th className="p-2 text-left">Status naprawy</th>
              <th className="p-2 text-left">Status płatności</th>
              <th className="p-2 text-left">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t align-top">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.firstName} {order.lastName}</td>
                <td className="p-2">
                  {new Date(order.date).toLocaleString("pl-PL", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                    hour: "2-digit", minute: "2-digit"
                  })}
                </td>
                <td className="p-2 whitespace-pre-line">
                  {order.services.map((s: any) => s.name).join(", ")}
                </td>
                <td className="p-2">
                  {paymentMethodMap[order.paymentMethod?.toLowerCase()] || order.paymentMethod}
                </td>
                <td className="p-2">
                  {repairStatusMap[order.repairStatus?.toLowerCase()] || order.repairStatus}
                </td>
                <td className="p-2">
                  {paymentStatusMap[order.paymentStatus?.toLowerCase()] || order.paymentStatus}
                </td>
                <td className="p-2">
                  <div className="flex flex-col md:flex-row gap-2">
                    <button
                      className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => navigate(`/worker/orders/edit/${order.id}`)}
                    >
                      <FaEdit className="mr-1" /> Edytuj
                    </button>
                    <button
                      className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => deleteOrder(order.id)}
                    >
                      <FaTrashAlt className="mr-1" /> Usuń
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
