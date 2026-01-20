import React from "react";
import { useNavigate } from "react-router-dom";
import {
    FaTools,
    FaClipboardList,
    FaExchangeAlt,
    FaCalendarAlt,
    FaSignOutAlt
} from "react-icons/fa";

const WorkerPanel: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold text-blue-700 mb-10 flex justify-center items-center gap-2">
                <FaTools /> Panel Pracownika
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => navigate("/worker/manage-orders")}
                    className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-xl shadow-md text-lg transition"
                >
                    <FaClipboardList /> Zamówienia do obsługi
                </button>

                <button
                    onClick={() => navigate("/worker/status-update")}
                    className="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white py-5 px-8 rounded-xl shadow-md text-lg transition"
                >
                    <FaExchangeAlt /> Zmień status zamówienia
                </button>

                <button
                    onClick={() => navigate("/worker/manage-appointments")}
                    className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white py-5 px-8 rounded-xl shadow-md text-lg transition"
                >
                    <FaCalendarAlt /> Edytuj dostępne terminy
                </button>
            </div>

            <div className="mt-12">
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        localStorage.removeItem("username");
                        navigate("/login");
                    }}
                    className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg text-lg shadow-md transition"
                >
                    <FaSignOutAlt /> Wyloguj się
                </button>
            </div>
        </div>
    );
};

export default WorkerPanel;
