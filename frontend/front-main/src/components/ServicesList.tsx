import React, { useEffect, useState } from "react";
import servicesService from "../services/servicesService";

const ServicesList: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const data = await servicesService.getServices();

                if (!Array.isArray(data) || data.length === 0) {
                    setError("Brak dostępnych usług.");
                    setServices([]);
                } else {
                    setServices(data);
                }
            } catch {
                setError("Nie udało się pobrać usług. Spróbuj ponownie później.");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Lista usług</h2>

            {loading && <p className="text-lg text-blue-600 text-center">Ładowanie usług...</p>}
            {error && <p className="text-lg text-red-500 text-center">{error}</p>}

            {!loading && !error && services.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                    {services.map(service => (
                        <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">{service.name}</h3>
                            <p className="text-gray-700 mb-4">{service.description}</p>
                            <p className="text-lg font-bold text-orange-500">Cena: {service.price} zł</p>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && services.length === 0 && (
                <p className="text-center text-gray-500">Brak dostępnych usług.</p>
            )}
        </div>
    );
};

export default ServicesList;
