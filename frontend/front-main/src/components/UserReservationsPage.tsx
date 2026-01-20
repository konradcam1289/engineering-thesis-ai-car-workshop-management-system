import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../services/apiService";
import {
  CalendarDays,
  ClipboardList,
  BadgeCheck,
  Wrench,
  AlertCircle
} from "lucide-react";

interface Service {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  status: string;
  appointmentDate: string;
  services: Service[];
}

const statusMap: Record<string, string> = {
  pending: "Oczekujące",
  in_progress: "W trakcie naprawy",
  completed: "Zakończone",
  cancelled: "Anulowane",
};

const UserReservationsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    apiRequest(`/api/admin/users/${userId}/orders`, { method: "GET" })
      .then((data) => setOrders(data))
      .catch((error) => console.error(" Błąd pobierania rezerwacji:", error));
  }, [userId]);

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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700 flex items-center justify-center gap-2">
        <ClipboardList className="w-8 h-8" /> Rezerwacje użytkownika
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5 text-gray-400" />
          Brak rezerwacji dla tego użytkownika.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-blue-600" />
                ID: <span className="font-normal">{order.id}</span>
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-gray-600" />
                <strong>Status:</strong>{" "}
                {statusMap[order.status?.toLowerCase()] || order.status}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-600" />
                <strong>Data:</strong> {formatDate(order.appointmentDate)}
              </p>
              <p className="text-gray-700 font-medium mt-2 mb-1 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-gray-600" /> Usługi:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-2">
                {order.services.map((service) => (
                  <li key={service.id}>
                    {service.name} – {service.price.toFixed(2)} zł
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReservationsPage;
