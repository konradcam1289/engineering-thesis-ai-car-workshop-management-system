import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../../services/apiService";
import { FaEdit, FaTools, FaCalendarAlt, FaSave } from "react-icons/fa";

interface WorkshopService {
  id: number;
  name: string;
  price: number;
}

interface AvailableDate {
  id: number;
  dateTime: string;
}

interface OrderData {
  id: number;
  services: WorkshopService[];
  availableDate: AvailableDate;
}

const EditOrder: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderData | null>(null);
  const [allServices, setAllServices] = useState<WorkshopService[]>([]);
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedDateId, setSelectedDateId] = useState<number | null>(null);

  useEffect(() => {
    apiRequest(`/api/worker/orders/${id}`, { method: "GET" }).then((data) => {
      setOrder(data);
      setSelectedServices(data.services.map((s: WorkshopService) => s.id));
      setSelectedDateId(data.availableDate.id);
    });

    apiRequest("/api/admin/services", { method: "GET" }).then(setAllServices);
    apiRequest("/api/available-dates", { method: "GET" }).then(setAvailableDates);
  }, [id]);

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    apiRequest(`/api/worker/orders/${id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceIds: selectedServices,
        availableDateId: selectedDateId,
      }),
    })
      .then(() => {
        alert(" Zamówienie zaktualizowane");
        navigate("/worker/orders");
      })
      .catch(() => alert(" Błąd podczas zapisu zamówienia"));
  };

  if (!order) return <p className="text-center mt-10"> Ładowanie zamówienia...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <FaEdit /> Edytuj zamówienie #{order.id}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-semibold block mb-2 flex items-center gap-2">
            <FaTools /> Wybierz usługi:
          </label>
          {allServices.map((service) => (
            <label key={service.id} className="block text-sm mb-1">
              <input
                type="checkbox"
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
                className="mr-2"
              />
              {service.name} ({service.price.toFixed(2)} zł)
            </label>
          ))}
        </div>

        <div>
          <label className="font-semibold block mb-2 flex items-center gap-2">
            <FaCalendarAlt /> Wybierz termin:
          </label>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={selectedDateId ?? ""}
            onChange={(e) => setSelectedDateId(parseInt(e.target.value))}
          >
            <option value="" disabled>
              -- Wybierz dostępny termin --
            </option>
            {availableDates.map((date) => (
              <option key={date.id} value={date.id}>
                {new Date(date.dateTime).toLocaleString("pl-PL")}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded text-lg flex items-center justify-center gap-2"
        >
          <FaSave /> Zapisz zmiany
        </button>
      </form>
    </div>
  );
};

export default EditOrder;
