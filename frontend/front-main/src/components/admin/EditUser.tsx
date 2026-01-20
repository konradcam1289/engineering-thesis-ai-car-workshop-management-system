import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../../services/apiService";
import {
  UserCog,
  Save,
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
} from "lucide-react";

const rolesMap: Record<string, string> = {
  CLIENT: "Klient",
  WORKER: "Pracownik",
  ADMIN: "Administrator",
};

const availableRoles = Object.keys(rolesMap);

interface UserForm {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  roles: string[];
}

const EditUser: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState<UserForm>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    roles: [],
  });

  useEffect(() => {
    apiRequest(`/api/admin/users/${id}`, { method: "GET" })
      .then((data) => {
        setUser(data);
        setForm({
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          roles: data.roles,
        });
      })
      .catch((err) => console.error(" Błąd ładowania użytkownika:", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = (role: string) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apiRequest(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        alert(" Użytkownik został zaktualizowany");
        navigate("/admin/manage-users");
      })
      .catch((err) => console.error(" Błąd zapisu:", err));
  };

  if (!user) return <p>⏳ Ładowanie danych użytkownika...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <UserCog className="w-7 h-7" />
        Edytuj użytkownika
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Nazwa użytkownika</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2">
            <Mail size={16} /> Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Imię</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Nazwisko</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2">
            <Phone size={16} /> Telefon
          </label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2">
            <MapPin size={16} /> Adres
          </label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <p className="mb-2 font-semibold flex items-center gap-2">
            <BadgeCheck size={16} /> Role użytkownika:
          </p>
          {availableRoles.map((role) => (
            <label key={role} className="block text-sm ml-2">
              <input
                type="checkbox"
                checked={form.roles.includes(role)}
                onChange={() => handleRoleToggle(role)}
                className="mr-2"
              />
              {rolesMap[role]}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          <Save size={18} /> Zapisz zmiany
        </button>
      </form>
    </div>
  );
};

export default EditUser;
