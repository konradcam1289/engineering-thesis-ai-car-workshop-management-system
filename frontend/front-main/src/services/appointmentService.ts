import { apiRequest } from "../services/apiService";
import { formatDateForBackend } from "../utils/dateUtils";

export interface AvailableDate {
    id: number;
    dateTime: string;
    reserved: boolean;
    username?: string;
}

const appointmentService = {

    getAvailableDates: async (): Promise<AvailableDate[]> => {
        return await apiRequest("/api/available-dates");
    },

    addAvailableDate: async (datetime: Date): Promise<void> => {
        const formatted = formatDateForBackend(datetime);
        await apiRequest("/api/available-dates/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dateTime: formatted })
        });
    },

    deleteAvailableDate: async (id: number): Promise<void> => {
        await apiRequest(`/api/available-dates/${id}`, {
            method: "DELETE"
        });
    },

    createReservation: async (reservationData: {
        username: string;
        serviceIds: number[];
        appointmentDate: string;
        paymentMethod: string;
    }): Promise<void> => {
        await apiRequest("/api/orders/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reservationData)
        });
    }
};

export default appointmentService;
