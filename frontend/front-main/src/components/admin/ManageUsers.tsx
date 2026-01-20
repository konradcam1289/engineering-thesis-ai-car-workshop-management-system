import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserMinus,
  UserPlus,
  Pencil,
} from "lucide-react";

interface User {
  id: number;
  username: string;
  email: string;
  primaryRole: string;
}

const roleMap: Record<string, string> = {
  ROLE_ADMIN: "Administrator",
  ROLE_WORKER: "Pracownik",
  ROLE_CLIENT: "Klient",
};

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [viewInactive, setViewInactive] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = () => {
    const endpoint = viewInactive ? "/api/admin/users/inactive" : "/api/admin/users";
    apiRequest(endpoint)
      .then((data) => setUsers(data))
      .catch((error) => console.error(" Błąd pobierania użytkowników:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, [viewInactive]);

  const deactivateUser = (id: number) => {
    apiRequest(`/api/admin/users/${id}`, { method: "DELETE" })
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((error) => console.error(" Błąd dezaktywacji użytkownika:", error));
  };

  const reactivateUser = (id: number) => {
    apiRequest(`/api/admin/users/${id}/reactivate`, { method: "PUT" })
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((error) => console.error(" Błąd reaktywacji użytkownika:", error));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-700 flex items-center gap-2">
          <Users size={28} /> Zarządzanie użytkownikami
        </h1>
        <div className="flex">
          <button
            onClick={() => setViewInactive(false)}
            className={`px-4 py-2 rounded-l ${!viewInactive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Aktywni
          </button>
          <button
            onClick={() => setViewInactive(true)}
            className={`px-4 py-2 rounded-r ${viewInactive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Nieaktywni
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">Brak użytkowników do wyświetlenia.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{user.username}</h2>
              <p className="text-gray-600 mb-1">{user.email}</p>
              <p className="text-gray-600 mb-4">
                Rola: <span className="font-semibold text-indigo-600">{roleMap[user.primaryRole] ?? user.primaryRole}</span>
              </p>
              <div className="flex flex-col space-y-2">
                {!viewInactive && (
                  <button
                    onClick={() => deactivateUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow flex items-center justify-center gap-2"
                  >
                    <UserMinus size={18} /> Dezaktywuj
                  </button>
                )}
                {viewInactive && (
                  <button
                    onClick={() => reactivateUser(user.id)}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg shadow flex items-center justify-center gap-2"
                  >
                    <UserPlus size={18} /> Aktywuj ponownie
                  </button>
                )}
                <button
                  onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow flex items-center justify-center gap-2"
                >
                  <Pencil size={18} /> Edytuj dane
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
