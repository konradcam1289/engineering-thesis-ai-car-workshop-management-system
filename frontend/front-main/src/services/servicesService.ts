import { apiRequest } from "./apiService";

const servicesService = {
    getServices: async () => {
        return await apiRequest("/api/services", { method: "GET" });
    },

    createService: async (serviceData: { name: string; price: number; description: string; available: boolean }) => {
        return await apiRequest("/api/admin/services", {
            method: "POST",
            body: JSON.stringify(serviceData),
            headers: { "Content-Type": "application/json" }
        });
    },

    deleteService: async (id: number) => {
        return await apiRequest(`/api/admin/services/${id}`, {
            method: "DELETE"
        });
    },

    updateService: async (id: number, serviceData: { name: string; price: number; description: string; available: boolean }) => {
        return await apiRequest(`/api/admin/services/${id}`, {
            method: "PUT",
            body: JSON.stringify(serviceData),
            headers: { "Content-Type": "application/json" }
        });
    }
};

export default servicesService;
