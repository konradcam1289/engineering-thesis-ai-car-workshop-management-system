import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderService } from "../../services/orderService";
import { FaEdit, FaTrashAlt, FaArrowLeft } from "react-icons/fa";

const paymentStatusMap: Record<string, string> = {
    paid: "Opłacone",
    unpaid: "Nieopłacone"
};

const repairStatusMap: Record<string, string> = {
    pending: "Oczekujące",
    in_progress: "W trakcie naprawy",
    completed: "Zakończone",
    cancelled: "Anulowane"
};

const UserReservations: React.FC = () => {
    const [reservations, setReservations] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await orderService.getUserOrders();
                setReservations(data);
            } catch (error) {
                alert("Błąd pobierania rezerwacji.");
            }
        };

        fetchReservations();
    }, []);

    const handleDeleteReservation = async (reservationId: number) => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć tę rezerwację?");
        if (!confirmDelete) return;

        try {
            await orderService.deleteOrder(reservationId);
            setReservations(prev => prev.filter(res => res.id !== reservationId));
            alert("Rezerwacja została usunięta.");
        } catch (error) {
            alert("Nie udało się usunąć rezerwacji.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Twoje Rezerwacje</h1>

            {reservations.length === 0 ? (
                <p className="text-gray-600 text-lg text-center">Brak rezerwacji.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {reservations.map((order) => (
                        <div key={order.id} className="p-6 bg-gray-100 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-blue-700 mb-4">Rezerwacja #{order.id}</h2>
                            <p className="mb-2">
                                <span className="font-semibold">Usługi:</span>{" "}
                                {order.services.map((service: any) => service.name).join(", ")}
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Data wizyty:</span>{" "}
                                {new Date(order.availableDate.dateTime).toLocaleString("pl-PL")}
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Status płatności:</span>{" "}
                                {paymentStatusMap[order.paymentStatus?.toLowerCase()] || order.paymentStatus}
                            </p>
                            <p className="mb-6">
                                <span className="font-semibold">Status naprawy:</span>{" "}
                                {repairStatusMap[order.repairStatus?.toLowerCase()] || order.repairStatus}
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => navigate(`/contact?subject=Edycja rezerwacji #${order.id}`)}
                                    className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md transition"
                                >
                                    <FaEdit /> Edytuj
                                </button>

                                <button
                                    onClick={() => handleDeleteReservation(order.id)}
                                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
                                >
                                    <FaTrashAlt /> Usuń
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-10">
                <button
                    onClick={() => navigate("/client/home")}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-lg"
                >
                    <FaArrowLeft /> Powrót do panelu
                </button>
            </div>
        </div>
    );
};

export default UserReservations;
