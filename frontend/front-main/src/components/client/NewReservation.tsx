import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appointmentService, { AvailableDate } from "../../services/appointmentService";
import { toast } from "react-toastify";
import { parseBackendDate } from "../../utils/dateUtils";

const NewReservation: React.FC = () => {
    const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
    const [selectedDate, setSelectedDate] = useState<AvailableDate | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadAvailableDates();
    }, []);

    const loadAvailableDates = async () => {
        try {
            const dates = await appointmentService.getAvailableDates();
            const freeDates = dates.filter(d => !d.reserved);
            setAvailableDates(freeDates);
        } catch {
            toast.error("Błąd podczas pobierania dostępnych terminów");
        }
    };

    const handleNext = () => {
        if (!selectedDate) {
            toast.warning("Wybierz dostępny termin przed przejściem dalej.");
            return;
        }

        localStorage.setItem("availableDateId", String(selectedDate.id));
        navigate(`/client/select-service`);
    };

    return (
        <div className="max-w-2xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold text-blue-700 mb-8">Nowa rezerwacja</h1>

            <div className="mb-6">
                <h2 className="mb-4 text-lg">Wybierz dostępny termin:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableDates.map(date => {
                        const localDate = parseBackendDate(date.dateTime);
                        return (
                            <button
                                key={date.id}
                                onClick={() => setSelectedDate(date)}
                                className={`py-3 rounded-lg border 
                                    ${selectedDate?.id === date.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} 
                                    hover:bg-blue-500 hover:text-white transition`}
                            >
                                {localDate.toLocaleString()}
                            </button>
                        )
                    })}
                </div>
            </div>

            <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-lg"
            >
                Dalej
            </button>
        </div>
    );
};

export default NewReservation;
