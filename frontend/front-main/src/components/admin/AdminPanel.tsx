import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">⚙️ Panel Administratora</h1>
            <p className="text-gray-600 mb-6">
                Witaj w panelu administratora! Wybierz, którą sekcją chcesz zarządzać.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-xl font-semibold"
                    onClick={() => navigate("/admin/users")}
                >
                    Zarządzanie użytkownikami
                </button>

                <button
                    className="bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-5 rounded-xl font-semibold"
                    onClick={() => navigate("/admin/add-user")}
                >
                    ➕ Dodaj nowego użytkownika
                </button>

                <button
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-xl font-semibold"
                    onClick={() => navigate("/admin/services")}
                >
                    Zarządzanie usługami
                </button>
            </div>

            <p className="text-sm text-gray-500">
                Wybierz jedną z dostępnych opcji, aby rozpocząć zarządzanie danymi.
            </p>
        </div>
    );
};

export default AdminPanel;
