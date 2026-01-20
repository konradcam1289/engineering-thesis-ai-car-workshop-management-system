import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services/apiService";

const ManageAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        apiRequest("/api/admin/appointments", { method: "GET" })
            .then((data) => setAppointments(data))
            .catch((error) => console.error(" Błąd pobierania rezerwacji:", error));
    }, []);

    const deleteAppointment = (id: number) => {
        apiRequest(`/api/admin/appointments/${id}`, { method: "DELETE" })
            .then(() => setAppointments(appointments.filter((appointment) => appointment.id !== id)))
            .catch((error) => console.error(" Błąd usuwania rezerwacji:", error));
    };

    return (
        <div>
            <h1>📅 Zarządzanie rezerwacjami</h1>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        {appointment.date} - {appointment.clientName}
                        <button onClick={() => deleteAppointment(appointment.id)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageAppointments;
