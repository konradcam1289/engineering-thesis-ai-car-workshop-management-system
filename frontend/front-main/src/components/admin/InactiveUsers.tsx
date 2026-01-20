import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const InactiveUsers: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiRequest("/api/admin/users/inactive", { method: "GET" })
            .then((data) => setUsers(data))
            .catch((error) => console.error(" Błąd pobierania nieaktywnych użytkowników:", error));
    }, []);

    const reactivateUser = (id: number) => {
        apiRequest(`/api/admin/users/${id}/reactivate`, { method: "PUT" })
            .then(() => setUsers(users.filter((user) => user.id !== id)))
            .catch((error) => console.error(" Błąd aktywacji użytkownika:", error));
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">🛑 Nieaktywni użytkownicy</h1>
            {users.length === 0 ? (
                <p className="text-center text-gray-600">Brak nieaktywnych użytkowników.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white p-5 rounded-xl shadow border border-gray-300">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{user.username}</h2>
                            <p className="text-gray-600">{user.email}</p>
                            <button
                                onClick={() => reactivateUser(user.id)}
                                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow"
                            >
                                Aktywuj ponownie
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InactiveUsers;
