import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../../services/apiService";

const Payment: React.FC = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const availableDateIdStr = localStorage.getItem("availableDateId");
    const availableDateId = availableDateIdStr ? parseInt(availableDateIdStr, 10) : null;

    useEffect(() => {
        if (!username) fetchUsername();
    }, []);

    const fetchUsername = async () => {
        try {
            const data = await apiRequest("/api/auth/user", { method: "GET" });
            setUsername(data.username);
            localStorage.setItem("username", data.username);
        } catch {
            toast.error("Brak tokena lub błąd pobrania użytkownika.");
            navigate("/login");
        }
    };

    const handlePayment = async () => {
        if (cart.length === 0 || !availableDateId || !username) {
            toast.error("Brak danych zamówienia.");
            return;
        }

        const serviceIds = cart.map((item: any) => item.id);

        const orderData = {
            username,
            serviceIds,
            availableDateId,
            paymentMethod,
        };

        try {
            const response = await apiRequest("/api/orders/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const orderId = response.id;

            if (paymentMethod === "cash") {
                toast.success("Rezerwacja została dodana poprawnie!");
                localStorage.removeItem("cart");
                localStorage.removeItem("availableDateId");
                setTimeout(() => navigate("/client/reservations"), 2000);
                return;
            }

            const payUResponse = await fetch(`/api/payments/create?orderId=${orderId}`, { method: "POST" });
            const payUData = await payUResponse.json();

            if (!payUData["redirectUri"]) {
                throw new Error("Brak redirectUri z PayU");
            }

            window.location.href = payUData["redirectUri"];
        } catch (error: any) {
            console.error("Payment error:", error);
            if (error.message?.includes("409")) {
                toast.error("Wybrany termin jest już zajęty. Wybierz inny termin.");
            } else {
                toast.error("Nie udało się przetworzyć płatności.");
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold text-blue-700 mb-8">Wybór metody płatności</h1>

            <div className="mb-6 text-left">
                <label className="flex items-center gap-3 mb-4">
                    <input
                        type="radio"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                        className="w-5 h-5"
                    />
                    <span className="text-lg">Płatność online (PayU)</span>
                </label>
                <label className="flex items-center gap-3">
                    <input
                        type="radio"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        className="w-5 h-5"
                    />
                    <span className="text-lg">Płatność na miejscu</span>
                </label>
            </div>

            <button
                onClick={handlePayment}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-md transition"
            >
                Potwierdź płatność
            </button>
        </div>
    );
};

export default Payment;
