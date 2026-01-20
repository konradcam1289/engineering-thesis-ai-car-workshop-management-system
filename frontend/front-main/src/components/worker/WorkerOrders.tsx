import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  CreditCard,
  Wrench,
  BadgeDollarSign,
  Trash,
  Pencil,
  FileText,
  Settings,
} from "lucide-react";

interface Order {
  id: number;
  firstName: string;
  lastName: string;
  date: string;
  paymentMethod: string;
  repairStatus: string;
  paymentStatus: string;
  services: {
    id: number;
    name: string;
    price: number;
  }[];
}

const paymentStatusMap: Record<string, string> = {
  paid: "Opłacone",
  unpaid: "Nieopłacone",
};

const repairStatusMap: Record<string, string> = {
  pending: "Oczekujące",
  in_progress: "W trakcie naprawy",
  completed: "Zakończone",
  cancelled: "Anulowane",
};

const paymentMethodMap: Record<string, string> = {
  card: "Karta",
  cash: "Gotówka",
  blik: "BLIK",
  online: "Online",
};

const WorkerOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest("/api/worker/orders", { method: "GET" })
      .then(setOrders)
      .catch((err) => console.error(" Błąd ładowania zamówień:", err));
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to zamówienie?")) return;

    apiRequest(`/api/worker/orders/${id}`, { method: "DELETE" })
      .then(() => {
        setOrders((prev) => prev.filter((order) => order.id !== id));
      })
      .catch((err) => console.error(" Błąd usuwania zamówienia:", err));
  };

  const handleEdit = (id: number) => {
    navigate(`/worker/orders/edit/${id}`);
  };

  const formatDate = (dateString: string) => {
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime())
      ? "Nieznana data"
      : parsed.toLocaleString("pl-PL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-2">
        <FileText size={28} /> Lista zamówień do obsługi
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">Brak dostępnych zamówień.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FileText size={20} /> Zamówienie #{order.id}
                  </h2>
                  <p className="text-gray-700 flex items-center gap-2">
                    <User size={16} /> {order.firstName} {order.lastName}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <Calendar size={16} /> {formatDate(order.date)}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <CreditCard size={16} />{" "}
                    {paymentMethodMap[order.paymentMethod?.toLowerCase()] || order.paymentMethod}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <Wrench size={16} />{" "}
                    {repairStatusMap[order.repairStatus?.toLowerCase()] || order.repairStatus}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <BadgeDollarSign size={16} />{" "}
                    {paymentStatusMap[order.paymentStatus?.toLowerCase()] || order.paymentStatus}
                  </p>
                </div>

                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
                  >
                    <Pencil size={16} /> <span className="ml-2">Edytuj</span>
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                  >
                    <Trash size={16} /> <span className="ml-2">Usuń</span>
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2 text-gray-800 flex items-center gap-2">
                  <Settings size={18} /> Usługi:
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {order.services.map((service) => (
                    <li key={service.id}>
                      {service.name} – {service.price.toFixed(2)} zł
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkerOrders;
