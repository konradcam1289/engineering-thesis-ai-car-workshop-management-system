import React, { useState, useEffect } from "react";
import { orderService } from "../../services/orderService";
import { toast } from "react-toastify";
import { HiOutlineRefresh } from "react-icons/hi";

interface Order {
  orderId: number;
  clientFirstName: string;
  clientLastName: string;
  serviceNames: string[];
  repairStatus: string;
  paymentStatus: string;
}

const repairStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
const paymentStatuses = ["UNPAID", "PAID"];

const statusLabels: { [key: string]: string } = {
  PENDING: "Oczekujące",
  IN_PROGRESS: "W trakcie",
  COMPLETED: "Zakończone",
  CANCELLED: "Anulowane",
  UNPAID: "Nieopłacone",
  PAID: "Opłacone",
};

const WorkerStatusUpdate: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderService.getWorkerOrdersView();
      setOrders(data);
    } catch (error) {
      toast.error("Błąd podczas ładowania zamówień");
    }
  };

  const handleRepairChange = async (orderId: number, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await orderService.updateRepairStatus(orderId, newStatus);
      toast.success("Status naprawy zaktualizowany");
      await loadOrders();
    } catch {
      toast.error("Błąd przy aktualizacji statusu naprawy");
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePaymentChange = async (orderId: number, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await orderService.updatePaymentStatus(orderId, newStatus);
      toast.success("Status płatności zaktualizowany");
      await loadOrders();
    } catch {
      toast.error("Błąd przy aktualizacji statusu płatności");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center flex items-center justify-center gap-2">
        <HiOutlineRefresh className="text-4xl" />
        Aktualizacja Statusów
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Brak zamówień do aktualizacji.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Klient</th>
              <th className="p-3 border">Usługi</th>
              <th className="p-3 border">Naprawa</th>
              <th className="p-3 border">Płatność</th>
              <th className="p-3 border">Zmień Naprawę</th>
              <th className="p-3 border">Zmień Płatność</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="text-center">
                <td className="p-3 border">{order.orderId}</td>
                <td className="p-3 border">
                  {order.clientFirstName} {order.clientLastName}
                </td>
                <td className="p-3 border">{order.serviceNames.join(", ")}</td>
                <td className="p-3 border">{statusLabels[order.repairStatus]}</td>
                <td className="p-3 border">{statusLabels[order.paymentStatus]}</td>
                <td className="p-3 border">
                  <select
                    value={order.repairStatus}
                    onChange={(e) =>
                      handleRepairChange(order.orderId, e.target.value)
                    }
                    disabled={updatingId === order.orderId}
                    className="p-2 rounded border"
                  >
                    {repairStatuses.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 border">
                  <select
                    value={order.paymentStatus}
                    onChange={(e) =>
                      handlePaymentChange(order.orderId, e.target.value)
                    }
                    disabled={updatingId === order.orderId}
                    className="p-2 rounded border"
                  >
                    {paymentStatuses.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkerStatusUpdate;
