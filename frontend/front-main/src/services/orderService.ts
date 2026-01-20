import { apiRequest } from "./apiService";

const BASE_URL = "/api/orders";

export const orderService = {
  getWorkerOrdersView: async () => {
    return await apiRequest(`${BASE_URL}/status-view`, { method: "GET" });
  },

  updateRepairStatus: async (id: number, newStatus: string) => {
    return await apiRequest(`${BASE_URL}/${id}/update-status`, {
      method: "PUT",
      body: JSON.stringify({ repairStatus: newStatus }),
    });
  },

  updatePaymentStatus: async (id: number, newStatus: string) => {
    return await apiRequest(`${BASE_URL}/${id}/update-payment`, {
      method: "PUT",
      body: JSON.stringify({ paymentStatus: newStatus }),
    });
  },

  getUserOrders: async () => {
    return await apiRequest(`${BASE_URL}/user`, { method: "GET" });
  },

  createOrder: async (orderData: {
    availableDateId: number;
    serviceIds: number[];
  }) => {
    return await apiRequest(`${BASE_URL}/create`, {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  deleteOrder: async (id: number) => {
    return await apiRequest(`${BASE_URL}/${id}`, { method: "DELETE" });
  },
};
