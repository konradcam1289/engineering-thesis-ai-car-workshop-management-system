import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import servicesService from "../../services/servicesService";
import { toast } from "react-toastify";

const SelectService: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [cart, setCart] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const availableDateId = localStorage.getItem("availableDateId");
        if (!availableDateId) {
            toast.error("Nie wybrano terminu.");
            navigate("/client/new-reservation");
            return;
        }

        servicesService.getServices()
            .then(data => {
                if (Array.isArray(data)) {
                    const onlyAvailable = data.filter(service => service.available);
                    setServices(onlyAvailable);
                } else {
                    console.error("Nieprawidłowy format danych z API:", data);
                    setServices([]);
                }
            })
            .catch(err => {
                console.error("Błąd przy pobieraniu usług:", err);
                toast.error("Błąd przy pobieraniu usług.");
                setServices([]);
            });
    }, [navigate]);

    const handleAddToCart = (service: any) => {
        if (cart.find(item => item.id === service.id)) {
            toast.warning("Ta usługa jest już w koszyku.");
            return;
        }
        setCart([...cart, service]);
    };

    const handleRemoveFromCart = (serviceId: number) => {
        setCart(cart.filter(item => item.id !== serviceId));
    };

    const proceedToPayment = () => {
        if (cart.length === 0) {
            toast.warning("Dodaj minimum jedną usługę.");
            return;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/payment");
    };

    return (
        <div className="max-w-6xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Wybierz usługę</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map(service => (
                    <div key={service.id} className="p-6 bg-gray-100 rounded-lg shadow-md text-left">
                        <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                        <p className="mb-2 text-gray-600">{service.description}</p>
                        <p className="font-bold text-orange-500 mb-4">{service.price} PLN</p>
                        <button
                            onClick={() => handleAddToCart(service)}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition w-full"
                        >
                            Dodaj do koszyka
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Twój koszyk</h2>

                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Koszyk jest pusty.</p>
                ) : (
                    <ul className="space-y-4">
                        {cart.map(item => (
                            <li key={item.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-orange-500 font-bold">{item.price} PLN</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
                                >
                                    Usuń
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-10 flex justify-center">
                    <button
                        disabled={cart.length === 0}
                        onClick={proceedToPayment}
                        className={`py-3 px-10 rounded-lg text-lg transition ${cart.length === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                    >
                        Przejdź do płatności
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectService;
